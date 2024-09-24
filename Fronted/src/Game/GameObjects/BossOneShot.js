import Phaser from "phaser";

class BossOneShot extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y) {
    super(scene, x, y, 0xff0000, 40, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(40);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.init();
    this.name = "bossOneShot";
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      intensity: { from: 0.5, to: 1 },
      repeat: -1,
    });
    this.scene.tweens.add({
      targets: this,
      duration: 2000,
      radius: { from: 10, to: 40 },
      repeat: 0,
    });
  }

  dead() {
    this.destroy();
  }
}

export default BossOneShot;
