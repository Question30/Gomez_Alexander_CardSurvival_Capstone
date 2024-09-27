import Phaser from "phaser";

class BossThreeShot extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y) {
    super(scene, x, y, 0xff0000, 10, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(10);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.init();
    this.name = "bossThreeShot";
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
      radius: { from: 0, to: 10 },
      repeat: 0,
    });
  }

  dead() {
    this.destroy();
  }
}

export default BossThreeShot;
