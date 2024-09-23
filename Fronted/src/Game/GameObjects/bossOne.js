import Phaser from "phaser";

export default class BossOne extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "bossOne") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(2);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.health = 100;
    this.name = "bossOne";
    this.init();
  }

  init() {
    this.attacking = false;
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 5000,
    });
    this.addAnimations();
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

  sleep() {
    this.body.reset(this.x, this.y);
    this.anims.play("sleep", true);
    this.attacking = true;
    this.timer.reset({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 10000,
    });
  }

  attack() {
    this.body.reset(this.x, this.y);
    this.anims.play("charge", true);
    this.attacking = true;
    this.timer.reset({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 10000,
    });
  }

  addAnimations() {
    this.scene.anims.create({
      key: "moveBoss",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "charge",
      frames: this.anims.generateFrameNumbers(this.name, { start: 8, end: 11 }),
      frameRate: 1,
      repeat: 0,
    });

    this.scene.anims.create({
      key: "sleep",
      frames: this.anims.generateFrameNumbers(this.name, {
        start: 16,
        end: 18,
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.play("moveBoss", true);
    this.on("animationcomplete", this.animationComplete, this);
  }

  animationComplete(animation, frame) {
    if (animation.key === "charge" || animation.key === "sleep") {
      this.anims.play("moveBoss", true);
      this.attacking = false;
    }
  }

  onTimerComplete() {
    if (this.isDead == false) {
      if (Phaser.Math.Between(1, 6) > 5) {
        this.sleep();
      } else {
        this.attack();
      }
    }
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
    console.log("dead ran");
    this.isDead = true;
    this.destroy();
  }
}
