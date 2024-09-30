import Phaser from "phaser";

class Shot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, playername, mouseX, mouseY) {
    super(scene, x, y, "card");
    this.playername = playername;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCircle(6);
    this.body.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.init();
    this.name = "shot";
    this.setScale(0.5);
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  init() {}
  update() {
    this.setRotation(
      Phaser.Math.Angle.Between(this.x, this.y, this.mouseX, this.mouseY)
    );
  }
}

export default Shot;
