import Phaser from "phaser";
import TurretShot from "./turretShot";

class Turret extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "turret") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.name = name;
    this.init();
    this.setFlipX(true);
  }

  init() {
    this.attacking = false;
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 3000,
    });
    this.addAnimations();
  }

  update() {
    if (!this.isDead && !this.attacking) {
      this.followPlayer();
    }
  }

  addAnimations() {
    this.scene.anims.create({
      key: "shootTurret",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 6 }),
      frameRate: 7,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "reloadTurret",
      frames: this.anims.generateFrameNumbers(this.name, { start: 9, end: 16 }),
      frameRate: 7,
      repeat: 0,
    });
    this.on("animationcomplete", this.animationComplete, this);
  }

  attack() {
    if (this.isDead == false) {
      this.attacking = true;
      this.anims.play("shootTurret", true);
      this.shoot();
      this.scene.time.delayedCall(250, () => {
        this.shoot();
      });
      this.scene.time.delayedCall(500, () => {
        this.shoot();
      });
      if (!this.isDead) {
        this.scene.time.delayedCall(600, () => {
          if (!this.isDead) {
            this.anims.play("reloadTurret", true);
          }
        });
        this.timer.reset({
          callback: this.onTimerComplete,
          callbackScope: this,
          delay: 5000,
        });
      }
    }
  }

  shoot() {
    if (!this.isDead) {
      const shot = new TurretShot(this.scene, this.x, this.y);
      this.scene.enemiesShotGroup.add(shot);
      this.scene.physics.moveTo(
        shot,
        this.scene.player.x,
        this.scene.player.y,
        250
      );
    }
  }

  onTimerComplete() {
    if (this.isDead == false) {
      this.attack();
    }
  }

  animationComplete(animation, frame) {
    if (animation.key == "reloadTurret") {
      this.anims.play("shootTurret", true);
      this.followPlayer();
      this.attacking = false;
    }
  }

  followPlayer() {
    this.setRotation(
      Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.scene.player.x,
        this.scene.player.y
      )
    );
  }

  dead() {
    this.isDead = true;
    this.timer.destroy();
    this.destroy();
  }
}

export default Turret;
