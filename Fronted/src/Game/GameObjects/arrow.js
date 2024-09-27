import Phaser from "phaser";

export default class Arrow extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, radian) {
    super(scene, x, y, "bossTwoArrow");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.name = "bossTwoArrow";
    this.setRotation(radian);
    this.setScale(3);
  }

  init() {
    this.addAnimation();
  }

  addAnimation() {
    this.scene.anims.create({
      key: "arrow",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
    this.anims.play("arrow");
  }

  dead() {
    this.destroy();
  }
}
