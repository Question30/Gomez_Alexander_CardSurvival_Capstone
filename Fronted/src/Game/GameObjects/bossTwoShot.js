import Phaser from "phaser";

class BossTwoShot extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y) {
    super(scene, x, y, 0xffff00, 10, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(10);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.name = "bossTwoShot";
  }

  dead() {
    this.destroy();
  }
}

export default BossTwoShot;
