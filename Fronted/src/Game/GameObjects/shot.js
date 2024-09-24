import Phaser from "phaser";

class Shot extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, playername) {
    super(scene, x, y, 0xffffff, 6, 0.4);
    this.playername = playername;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(6);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.init();
    this.name = "shot";
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      intensity: { from: 0.3, to: 0.7 },
      repeat: -1,
    });
  }
}

export default Shot;
