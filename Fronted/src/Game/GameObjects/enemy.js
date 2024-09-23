import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "enemy") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.5);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.name = "enemy";
    this.init();
    this.setFlipX(true);
  }

  init() {
    this.scene.anims.create({
      key: "enemyMove",
      frames: this.anims.generateFrameNumbers(this.name, { start: 2, end: 3 }),
      frameRate: 2,
      repeat: -1,
    });
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 1000,
    });
    this.anims.play("enemyMove", true);
  }

  update() {
    if (!this.isDead) {
      this.followPlayer();
    }
  }

  onTimerComplete() {
    if (this.isDead == false && this.scene.player.isAlive == true) {
      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 1000,
      });
    }
  }

  followPlayer() {
    this.scene.physics.moveTo(
      this,
      this.scene.player.x,
      this.scene.player.y,
      30
    );
    this.setRotation(
      Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      )
    );
  }

  dead() {
    this.isDead = true;
    this.destroy();
  }
}

export default Enemy;
