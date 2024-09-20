import Enemy from "./enemy";
import Phaser from "phaser";

class EnemyGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generate();
  }

  generate() {
    this.wave();
  }

  wave() {
    Array(10)
      .fill()
      .forEach((_, i) => this.addToWave(i));
  }

  update() {
    this.scene.enemiesGroup.children.entries.forEach((enemy) => {
      enemy.update();
    });
  }

  addToWave(i) {
    let x = this.getX();
    let y = this.getY();
    const enemy = new Enemy(this.scene, x, y);
    this.scene.tweens.add({
      targets: this,
      z: 1,
      ease: "Linear",
      duration: 12000,
      repeat: -1,
      delay: i * 100,
    });
    this;
    this.scene.enemiesGroup.add(enemy);
  }

  getX() {
    let num = Phaser.Math.Between(0, 1);

    let x =
      num < 1
        ? Phaser.Math.Between(
            this.scene.center_width - 400,
            this.scene.center_width - 100
          )
        : Phaser.Math.Between(
            this.scene.center_width + 100,
            this.scene.center_width + 400
          );

    return x;
  }
  getY() {
    let num = Phaser.Math.Between(0, 1);

    let y =
      num < 1
        ? Phaser.Math.Between(
            this.scene.center_height - 300,
            this.scene.center_height - 100
          )
        : Phaser.Math.Between(
            this.scene.center_height + 100,
            this.scene.center_height + 300
          );

    return y;
  }
}

export default EnemyGenerator;
