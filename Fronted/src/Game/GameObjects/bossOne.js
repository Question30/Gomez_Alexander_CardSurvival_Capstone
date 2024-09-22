import Phaser from "phaser";

export default class BossOne extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 64, 64, 0x00ffff);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.5);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.health = 100;
    this.name = "bossOne";
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

  takeDamage(num) {
    if (this.health > 0 && this.isDead == false) {
      let dmg = (this.health -= num);
      if (dmg < 0) {
        this.dead();
      }
    }
  }

  dead() {
    this.isDead = true;
    this.destroy();
  }
}
