import Player from "../GameObjects/player";
import EnemyGenerator from "../GameObjects/generateEnemies";
import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.player = null;
    this.enemy = null;
  }

  init() {
    this.number = 1;
    this.startTime = new Date();
    this.score = 0;
  }

  create() {
    this.duration = this.time * 1000;
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.player = new Player(this, this.center_width, this.center_height);
    this.text = this.add.text(32, 32);
    this.scoreText = this.add.text(
      this.center_width,
      32,
      "Score: " + this.score
    );

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
    this.addColliders();
  }

  update() {
    this.player.update();
    this.enemies.update();
    if (this.enemiesWaveGroup.getLength() === 0) {
      this.number = this.number + 1;
      this.enemies = new EnemyGenerator(this);
    }
  }

  addEnemies() {
    this.enemiesGroup = this.add.group();
    this.enemiesWaveGroup = this.add.group();
    this.enemies = new EnemyGenerator(this);
  }

  addShots() {
    this.shots = this.add.group();
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
      this.destroyEnemy,
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
        return true;
      },
      this
    );

    this.physics.world.on("worldbounds", this.onWorldBounds);
  }

  onWorldBounds(body, t) {
    const name = body.gameObject.name.toString();
    if (["foeshot", "shot"].includes(name)) {
      body.gameObject.destroy();
    }
  }

  destroyWaveEnemy(shot, enemy) {
    this.lastDestroyedWaveEnemy = { x: enemy.x, y: enemy.y };
    this.destroyEnemy(shot, enemy);
  }

  destroyEnemy(shot, enemy) {
    enemy.dead();
    shot.destroy();
    this.updateScore();
  }

  updateScore() {
    this.score += 100;
    this.scoreText.setText("Score: " + this.score);
  }

  killPlayer(enemy, player) {
    enemy.destroy();
    player.dead();
    this.endScene();
  }

  endScene() {
    this.time.delayedCall(
      2000,
      () => {
        this.finishScene();
      },
      null,
      this
    );
  }

  finishScene() {
    this.scene.stop("game");
    const scene = this.number < 5 ? "transition" : "outro";
    this.scene.start(scene, {
      next: "splash",
      name: "STAGE",
      number: this.number + 1,
    });
  }
}
