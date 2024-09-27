import Phaser from "phaser";

export default class BossThree extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "bossThree") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.startHealth = 1500;
    this.health = 1500;
    this.attacking = false;
    this.name = name;
    this.body.setSize(64, 64);
    this.init();
  }

  init() {
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 5000,
    });
    this.addAnimations();
    this.createHealthBar();
    this.updateHealthBar();
  }

  update() {
    if (this.isDead == false) {
      if (this.attacking == false) {
        this.followPlayer();
      }
    }
  }

  followPlayer() {
    this.scene.physics.moveTo(
      this,
      this.scene.player.x,
      this.scene.player.y,
      50
    );
  }

  addAnimations() {
    this.scene.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers(this.name, { start: 3, end: 4 }),
      frameRate: 2,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "gotem",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 2 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.play("walk", true);
  }

  takeDamage(num) {
    if (this.health > 0 && this.isDead == false) {
      let dmg = (this.health -= num);
      if (dmg < 0) {
        this.dead();
      }
      this.updateHealthBar();
    }
  }

  dead() {
    this.progressBar.destroy();
    this.loadBar.destroy();
    this.isDead = true;
    this.destroy();
  }

  createHealthBar() {
    this.loadBar = this.scene.add.graphics();
    this.loadBar.fillStyle(0x0088aa, 1);
    this.loadBar.fillRect(
      this.scene.cameras.main.width / 4,
      64,
      this.scene.cameras.main.width / 2,
      20
    );
    this.progressBar = this.scene.add.graphics();
  }

  updateHealthBar() {
    this.progressBar.clear();
    this.progressBar.fillStyle(0xd40000, 1);
    this.progressBar.fillRect(
      this.scene.cameras.main.width / 4,
      64,
      (this.scene.cameras.main.width / 2) * (this.health / this.startHealth),
      20
    );
  }
}
