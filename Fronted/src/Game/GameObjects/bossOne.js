import Phaser from "phaser";
import BossOneShot from "./BossOneShot";

export default class BossOne extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "bossOne") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(2);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.startHealth = 500;
    this.health = 500;
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

  sleep() {
    if (this.isDead == false) {
      this.anims.play("sleep", true);
      this.attacking = true;
      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 10000,
      });
    }
  }

  dash() {
    if (this.isDead == false) {
      this.scene.physics.moveTo(
        this,
        this.scene.player.x,
        this.scene.player.y,
        300
      );
    }
  }

  attack() {
    if (this.isDead == false) {
      // this.body.reset(this.x, this.y);
      this.anims.play("charge", true);
      this.attacking = true;
      this.shot = new BossOneShot(this.scene, this.x, this.y - 32);
      this.scene.enemiesShotGroup.add(this.shot);

      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 10000,
      });
    }
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
    if (animation.key === "charge") {
      this.anims.play("moveBoss", true);
      this.attacking = false;
      this.body.setImmovable(false);
      this.scene.physics.moveTo(
        this.shot,
        this.scene.player.x,
        this.scene.player.y,
        200
      );
    } else if (animation.key === "sleep") {
      this.dash();
      this.anims.play("moveBoss", true);
      this.scene.time.delayedCall(1000, () => {
        this.attacking = false;
        this.body.setImmovable(false);
      });
    }
  }

  onTimerComplete() {
    if (this.isDead == false) {
      this.attacking = true;
      this.body.reset(this.x, this.y);
      this.body.setImmovable(true);
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
      this.updateHealthBar();
    }
  }

  dead() {
    this.isDead = true;
    this.destroy();
    this.progressBar.destroy();
    this.loadBar.destroy();
    this.timer.destroy();
    this.shot.destroy();
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
