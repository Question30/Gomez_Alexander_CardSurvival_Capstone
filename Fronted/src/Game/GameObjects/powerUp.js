import Phaser from "phaser";

class PowerUp extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "extraBullet") {
    super(scene, x, y, "powerup");
    this.setOrigin(0.5);
    this.name = name;
    this.scene = scene;
    this.setScale(1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.init();
  }

  init() {
    this.scene.powerUps.add(this);
    this.addAnimations();
  }

  addAnimations() {
    this.scene.anims.create({
      key: "attackSpd",
      frames: this.anims.generateFrameNumbers("powerup", { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "moveSpd",
      frames: this.anims.generateFrameNumbers("powerup", { start: 3, end: 5 }),
      frameRate: 6,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "extraBullet",
      frames: this.anims.generateFrameNumbers("powerup", { start: 6, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.play(this.name, true);
  }

  destroy() {
    super.destroy();
  }
}

export default PowerUp;
