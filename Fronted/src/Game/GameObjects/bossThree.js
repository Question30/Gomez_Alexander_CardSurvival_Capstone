import Phaser from "phaser";
import BossThreeShot from "./bossThreeShot";
import BossCircle from "./bossCircle";

export default class BossThree extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "bossThree") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.startHealth = 750;
    this.health = 750;
    this.attacking = false;
    this.name = name;
    this.body.setSize(64, 64);
    this.init();
  }

  init() {
    this.radius = 0;
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
    if (this.body.velocity.x < 0) {
      this.setFlipX(false);
    } else {
      this.setFlipX(true);
    }
  }

  addAnimations() {
    this.scene.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers(this.name, { start: 4, end: 5 }),
      frameRate: 2,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "gotem",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 3 }),
      frameRate: 2,
      repeat: 0,
    });
    this.scene.anims.create({
      key: "spreadAttk",
      frames: this.anims.generateFrameNumbers(this.name, { start: 6, end: 7 }),
      frameRate: 2,
      repeat: 0,
    });

    this.anims.play("walk", true);
    this.on("animationcomplete", this.animationComplete, this);
  }

  animationComplete(animation, frame) {
    if (animation.key == "spreadAttk") {
      this.scene.time.delayedCall(2000, () => {
        this.anims.play("walk", true);
        this.attacking = false;
        this.body.setImmovable(false);
        this.followPlayer();
      });
    } else if (animation.key == "gotem") {
      this.anims.play("walk", true);
      this.attacking = false;
      this.body.setImmovable(false);
      this.followPlayer();
    }
  }
  takeDamage(num) {
    if (this.health > 0 && this.isDead == false) {
      let dmg = (this.health -= num);
      if (dmg < 0) {
        this.dead();
      } else {
        this.updateHealthBar();
      }
    }
  }

  spreadAttack() {
    if (this.isDead == false) {
      this.anims.play("spreadAttk");
      this.attacking = true;
      this.attack();
      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 10000,
      });
    }
  }

  attack() {
    console.log(this.flipX);

    const thumbShot = new BossThreeShot(
      this.scene,
      this.flipX ? this.x + 40 : this.x - 40,
      this.y + 20
    );
    this.scene.enemiesShotGroup.add(thumbShot);
    const indexShot = new BossThreeShot(
      this.scene,
      this.flipX ? this.x + 40 : this.x - 40,
      this.y - 15
    );
    this.scene.enemiesShotGroup.add(indexShot);
    this.scene.enemiesShotGroup.add(thumbShot);
    const middleShot = new BossThreeShot(
      this.scene,
      this.flipX ? this.x + 40 : this.x - 40,
      this.y - 25
    );
    this.scene.enemiesShotGroup.add(middleShot);
    this.scene.enemiesShotGroup.add(indexShot);
    this.scene.enemiesShotGroup.add(thumbShot);
    const ringShot = new BossThreeShot(
      this.scene,
      this.flipX ? this.x + 40 : this.x - 40,
      this.y - 25
    );
    this.scene.enemiesShotGroup.add(ringShot);
    this.scene.enemiesShotGroup.add(thumbShot);
    const pinkyShot = new BossThreeShot(
      this.scene,
      this.flipX ? this.x + 40 : this.x - 40,
      this.y - 25
    );
    this.scene.enemiesShotGroup.add(pinkyShot);

    this.scene.time.delayedCall(2000, () => {
      this.shootAttack(thumbShot, -120);
      this.shootAttack(indexShot, -60);
      this.shootAttack(middleShot, 0);
      this.shootAttack(ringShot, 60);
      this.shootAttack(pinkyShot, 120);
    });
  }

  shootAttack(shot, offset) {
    if (!this.isDead) {
      this.scene.physics.moveTo(
        shot,
        this.scene.player.x + offset,
        this.scene.player.y + offset,
        120
      );
    }
  }

  gotem() {
    this.anims.play("gotem", true);
    this.circle = new BossCircle(this.scene, this.x, this.y);
    this.scene.bossCirclegroup.add(this.circle);
    this.scene.time.delayedCall(4000, () => {
      this.circle.destroy();
    });
    this.timer.reset({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 10000,
    });
  }

  onTimerComplete() {
    if (this.isDead == false) {
      this.attacking = true;
      this.body.reset(this.x, this.y);
      this.body.setImmovable(true);
      if (Phaser.Math.Between(1, 6) > 4) {
        this.gotem();
      } else {
        this.spreadAttack();
      }
    }
  }

  dead() {
    this.timer.destroy();
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
