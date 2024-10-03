import Phaser from "phaser";

class TurretShot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.name = "turretShot";
    this.body.setSize(16, 16);
    this.setFlipX(true);
    this.init();
  }

  init() {
    this.setRotation(
      Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      )
    );
    this.scene.anims.create({
      key: "bullet",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 4 }),
      frameRate: 12,
      repeat: -1,
    });
  }

  dead() {
    this.destroy();
  }
}

export default TurretShot;
