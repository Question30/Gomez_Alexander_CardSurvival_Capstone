import Phaser from "phaser";

class Enemy extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32, 32, 0xff00ff);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.5);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.name = "baseEnemy";
  }

  update() {
    if (!this.isDead) {
      this.followPlayer();
    }
  }

  followPlayer() {
    this.scene.physics.moveTo(
      this,
      this.scene.player.x,
      this.scene.player.y,
      30
    );
  }

  dead() {
    this.isDead = true;
    this.destroy();
  }
}

export default Enemy;
