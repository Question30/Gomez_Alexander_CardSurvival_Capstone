import Phaser from "phaser";

class PowerUp extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, name = "extraBullet", color = 0xaaff00) {
    super(scene, x, y, 16, 16, color);
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
  }

  destroy() {
    super.destroy();
  }
}

export default PowerUp;
