import Phaser from "phaser";

class BossCircle extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y) {
    super(scene, x, y, 0xff0000, 50, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(50);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.init();
    this.name = "bossCircle";
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 3000,
      intensity: { from: 0.5, to: 1 },
      repeat: 0,
    });
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 500,
    });
  }

  grow() {
    if (this.radius < 300) {
      this.radius += 50;
      this.body.setCircle(this.radius);

      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 500,
      });
    }
  }

  onTimerComplete() {
    this.grow();
  }

  dead() {
    this.destroy();
  }
}

export default BossCircle;
