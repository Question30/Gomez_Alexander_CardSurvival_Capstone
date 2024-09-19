import Enemy from "./enemy";

class EnemyGenerator {
  constructor(scene) {
    this.scene = scene;
    this.generate();
  }

  generate() {
    this.wave();
  }

  wave() {
    Array(50)
      .fill()
      .forEach((_, i) => this.addToWave(i));
  }

  update() {
    this.scene.enemiesGroup.children.entries.forEach((enemy) => {
      enemy.update();
    });
  }

  addToWave(i) {
    let x = Phaser.Math.Between(
      this.scene.center_width - 400,
      this.scene.center_width + 400
    );
    let y = Phaser.Math.Between(
      this.scene.center_height - 300,
      this.scene.center_height + 300
    );
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
}

export default EnemyGenerator;
