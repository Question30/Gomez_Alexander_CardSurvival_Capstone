class Shot extends Phaser.GameObjects.PointLight {
  constructor(scene, x, y, playername, velocityX = 0, velocityY = 0) {
    super(scene, x, y, 0xffffff, 6, 0.4);
    this.playername = playername;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setVelocityX(velocityX);
    this.body.setVelocityY(velocityY);
    // this.body.setOffset(6, 9);
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
