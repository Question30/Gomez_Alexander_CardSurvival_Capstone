import BossOne from "./bossOne";
import BossThree from "./bossThree";
import BossTwo from "./bossTwo";
import Enemy from "./enemy";
import Phaser from "phaser";
import Turret from "./turret";

class EnemyGenerator {
  constructor(scene) {
    this.scene = scene;
    this.waveEnemies = [];
    this.generate();
    this.activeWave = false;
    this.waves = 0;
  }

  generate() {
    if (this.scene.number === 3) {
      this.spawnBossOne();
    } else if (this.scene.number === 7) {
      this.spawnBossTwo();
    } else if (this.scene.number === 10) {
      this.spawnBossThree();
    } else {
      let num = this.scene.number * 10;
      this.wave(num);
    }
  }

  wave(num = 10) {
    Array(num)
      .fill()
      .forEach((_, i) => this.addToWave(i));
    this.activeWave = true;
  }

  update() {
    if (this.activeWave && this.checkIfWaveComplete()) {
      this.activeWave = false;
    }

    if (
      this.scene.enemiesWaveGroup.length == 1 &&
      this.scene.enemiesWaveGroup[0].name == "bossOne"
    ) {
      this.bossOne.update();
    } else {
      this.scene.enemiesWaveGroup.children.entries.forEach((enemy) => {
        enemy.update();
      });
    }
  }

  spawnBossOne() {
    this.bossOne = new BossOne(this.scene, this.getX(), this.getY());
    this.scene.enemiesWaveGroup.add(this.bossOne);
  }

  spawnBossTwo() {
    this.bossTwo = new BossTwo(this.scene, this.getX(), this.getY());
    this.scene.enemiesWaveGroup.add(this.bossTwo);
  }
  spawnBossThree() {
    this.bossThree = new BossThree(this.scene, this.getX(), this.getY());
    this.scene.enemiesWaveGroup.add(this.bossThree);
  }

  addToWave(i) {
    let x = this.getX();
    let y = this.getY();

    if (Phaser.Math.Between(1, 105) > 100) {
      const enemy = new Turret(this.scene, x, y);
      this.scene.enemiesWaveGroup.add(enemy);
    } else {
      const enemy = new Enemy(this.scene, x, y);
      this.scene.enemiesWaveGroup.add(enemy);
    }
    this.scene.tweens.add({
      targets: this,
      z: 1,
      ease: "Linear",
      duration: 12000,
      repeat: -1,
      delay: i * 100,
    });
    this;
  }

  getX() {
    let num = Phaser.Math.Between(0, 1);

    let x =
      num < 1
        ? Phaser.Math.Between(
            this.scene.player.x - 400,
            this.scene.player.x - 100
          )
        : Phaser.Math.Between(
            this.scene.player.x + 100,
            this.scene.player.x + 400
          );

    return x;
  }
  getY() {
    let num = Phaser.Math.Between(0, 1);

    let y =
      num < 1
        ? Phaser.Math.Between(
            this.scene.player.y - 300,
            this.scene.player.y - 100
          )
        : Phaser.Math.Between(
            this.scene.player.y + 100,
            this.scene.player.y + 300
          );

    return y;
  }

  //Stops the Generation of Enemies
  stop() {
    clearInterval(this.generationIntervalId);
    this.scene.enemiesGroup.children.entries.forEach((enemy) => {
      if (enemy === null || !enemy.active) return;
      enemy.destroy();
    });
  }

  //End the Scene
  finishScene() {
    this.scene.endScene();
  }

  //Check if the wave was completed
  checkIfWaveComplete() {
    const enemies = this.scene.enemiesGroup.children.entries;

    return enemies.length === enemies.filter((enemy) => !enemy.active).length;
  }
}

export default EnemyGenerator;
