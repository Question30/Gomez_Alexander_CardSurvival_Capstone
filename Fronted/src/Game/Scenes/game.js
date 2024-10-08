import Player from "../GameObjects/player";
import EnemyGenerator from "../GameObjects/generateEnemies";
import Phaser from "phaser";
import PowerUp from "../GameObjects/powerUp";
import { EventBus } from "./eventbus";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.player = null;
    this.enemy = null;
    this.init();
  }

  init() {
    this.number = 1;
    this.startTime = new Date();
    this.score = 0;
    this.powerUp = null;
    this.totalTime = 0;
    this.completed = false;
    this.baseScore = 100;
    this.multiplyer = 1;
  }

  create() {
    this.duration = this.time * 1000;
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.player = new Player(this, this.center_width - 200, this.center_height);
    this.text = this.add.text(this.center_width - 400, 32);
    this.scoreText = this.add.text(
      this.center_width,
      32,
      "Score: " + this.score
    );

    this.waveText = this.add.text(this.width - 200, 32, "Wave: " + this.number);

    const timedEvent = this.time.addEvent({
      delay: 1000,
      repeat: -1,
      callback: () => {
        let elapsedTime = new Date() - this.startTime;
        let calcdHour = Math.floor(elapsedTime / 1000 / 60 / 60);
        let calcdMinutes = Math.floor(elapsedTime / 1000 / 60) - 60 * calcdHour;
        let calcDseconds = Math.floor(elapsedTime / 1000) - 60 * calcdMinutes;
        let hour = calcdHour < 10 ? "0" + calcdHour : calcdHour;
        let minutes = calcdMinutes < 10 ? "0" + calcdMinutes : calcdMinutes;
        let seconds = calcDseconds < 10 ? "0" + calcDseconds : calcDseconds;
        this.text.setText("Time: " + hour + ":" + minutes + ":" + seconds);
      },
    });

    this.addEnemies();
    this.addShots();
    this.addPowerUps();
    this.addColliders();
    this.time.delayedCall(1000 * 30, () => {
      this.multiplyer = 0.75;
    });
    this.time.delayedCall(1000 * 60, () => {
      this.multiplyer = 0.5;
    });

    EventBus.emit("current-scene-ready", this);
  }

  update() {
    this.player.update();
    this.enemies.update();
    if (this.enemiesWaveGroup.getLength() === 0) {
      this.newWave();
    }
  }
  newWave() {
    this.number += 1;
    if (this.number > 10) {
      this.endScene();
      this.completed = true;
    } else {
      this.multiplyer = 1;
      const powerUpName =
        this.availablePowerups[
          Phaser.Math.Between(0, this.availablePowerups.length - 1)
        ];
      this.powerUp = new PowerUp(
        this,
        this.center_width,
        this.center_height,
        powerUpName.value,
        powerUpName.color
      );
      this.enemies = new EnemyGenerator(this);
      this.updateWave();
      this.time.delayedCall(1000 * 30, () => {
        this.multiplyer = 0.75;
      });
      this.time.delayedCall(1000 * 60, () => {
        this.multiplyer = 0.5;
      });
    }
  }

  updateWave() {
    this.waveText.setText("Wave: " + this.number);
  }

  addEnemies() {
    this.enemiesGroup = this.add.group();
    this.enemiesWaveGroup = this.add.group();
    this.enemiesShotGroup = this.add.group();
    this.bossCirclegroup = this.add.group();
    this.enemies = new EnemyGenerator(this);
  }

  addShots() {
    this.shots = this.add.group();
  }

  addPowerUps() {
    this.powerUps = this.add.group();
    this.availablePowerups = [
      { value: "moveSpd" },
      { value: "attackSpd" },
      { value: "extraBullet" },
    ];
  }

  addColliders() {
    this.physics.add.collider(
      this.enemiesWaveGroup,
      this.player,
      this.killPlayer,
      () => {
        true;
      },
      this
    );

    this.physics.add.collider(
      this.shots,
      this.enemiesWaveGroup,
      this.destroyWaveEnemy,
      () => {
        true;
      },
      this
    );

    this.physics.add.collider(
      this.enemiesShotGroup,
      this.player,
      this.killPlayerShot,
      () => {
        true;
      },
      this
    );

    this.physics.add.overlap(
      this.enemiesShotGroup,
      this.shots,
      this.destroyShot,
      () => {
        true;
      },
      this
    );

    this.physics.add.overlap(
      this.bossCirclegroup,
      this.player,
      this.killPlayerShot,
      () => {
        true;
      },
      this
    );
    this.physics.add.overlap(
      this.bossCirclegroup,
      this.shots,
      this.destroyShot,
      () => {
        true;
      },
      this
    );

    this.physics.add.collider(
      this.player,
      this.powerUps,
      this.pickUpPowerUp,
      () => {
        true;
      },
      this
    );

    this.physics.add.overlap(
      this.shots,
      this.enemiesWaveGroup,
      this.destroyEnemy,
      () => {
        true;
      },
      this
    );

    this.physics.world.on("worldbounds", this.onWorldBounds);
  }

  onWorldBounds(body, t) {
    const name = body.gameObject.name.toString();
    if (
      [
        "shot",
        "bossOneShot",
        "bossTwoShot",
        "bossTwoArrow",
        "bossThreeShot",
        "turretShot",
      ].includes(name)
    ) {
      body.gameObject.destroy();
    }
  }

  pickUpPowerUp(player, powerUp) {
    if (powerUp.name === "attackSpd") {
      player.attackSpd -= 100;
    } else if (powerUp.name == "moveSpd") {
      player.moveSpd += 0.25;
    } else if (powerUp.name == "extraBullet") {
      player.bullets++;
    }

    powerUp.destroy();
  }

  destroyWaveEnemy(shot, enemy) {
    this.lastDestroyedWaveEnemy = { x: enemy.x, y: enemy.y };
    this.destroyEnemy(shot, enemy);
  }

  destroyEnemy(shot, enemy) {
    if (enemy.name.slice(0, 4) === "boss") {
      enemy.takeDamage(10 / this.player.bullets);
      if (enemy.health < 1) {
        enemy.dead();
        this.updateScore(1000 * this.multiplyer);
      }
      shot.destroy();
    } else {
      enemy.dead();
      shot.destroy();
      this.updateScore(this.baseScore * this.multiplyer);
    }
  }

  destroyShot(enemyShot, shot) {
    shot.destroy();
  }

  updateScore(num) {
    this.score += num;
    this.scoreText.setText("Score: " + this.score);
  }

  killPlayerShot(shot, player) {
    if (shot.name == "bossCircle") {
      player.canMove = false;
      this.time.delayedCall(2000, () => {
        player.canMove = true;
      });
      player.resetTimer();
    } else {
      shot.dead();
      player.dead();
      this.endScene();
    }
  }

  killPlayer(enemy, player) {
    player.dead();
    this.endScene();
  }

  endScene() {
    this.time.delayedCall(
      1000,
      () => {
        this.finishScene();
      },
      null,
      this
    );
  }

  finishScene() {
    this.scene.stop("game");
    this.totalTime = new Date() - this.startTime;
    this.scene.start("outro", {
      next: "game",
      name: "STAGE",
      number: 1,
      score: this.score,
      time: this.totalTime,
      completed: this.completed,
    });
  }
}
