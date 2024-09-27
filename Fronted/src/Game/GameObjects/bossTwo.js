import Phaser from "phaser";
import BossTwoShot from "./bossTwoShot";
import Arrow from "./arrow";

export default class BossTwo extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "bossTwo") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1);
    this.body.setCollideWorldBounds(true);
    this.isDead = false;
    this.startHealth = 1000;
    this.health = 1000;
    this.attacking = false;

    this.name = name;
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

  rage() {
    if (this.isDead == false) {
      this.anims.play("chargeBossTwo", true);
      this.scene.time.delayedCall(3000, () => {
        this.rageAttack();
      });
    }
  }

  rageAttack() {
    const arrowUp = new Arrow(
      this.scene,
      this.x,
      this.y - this.height,

      -Math.PI / 2
    );
    this.scene.enemiesShotGroup.add(arrowUp);
    this.scene.physics.moveTo(arrowUp, this.x, -this.scene.height, 120);

    const arrowDown = new Arrow(
      this.scene,
      this.x,
      this.y + this.height,
      Math.PI / 2
    );
    this.scene.enemiesShotGroup.add(arrowDown);
    this.scene.physics.moveTo(arrowDown, this.x, this.scene.height, 120);

    const arrowRight = new Arrow(this.scene, this.x + this.width, this.y, 0);
    this.scene.enemiesShotGroup.add(arrowRight);
    this.scene.physics.moveTo(arrowRight, this.scene.width, this.y, 120);

    const arrowLeft = new Arrow(
      this.scene,
      this.x - this.width,
      this.y,

      -Math.PI
    );
    this.scene.enemiesShotGroup.add(arrowLeft);
    this.scene.physics.moveTo(arrowLeft, -this.scene.width, this.y, 120);
    this.timer.reset({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 10000,
    });
  }

  addAnimations() {
    this.scene.anims.create({
      key: "reload",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 2 }),
      frameRate: 2,
      repeat: 2,
    });

    this.scene.anims.create({
      key: "shootBossTwo",
      frames: this.anims.generateFrameNumbers(this.name, { start: 3, end: 4 }),
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "chargeBossTwo",
      frames: this.anims.generateFrameNumbers(this.name, { start: 5, end: 10 }),
      frameRate: 2,
      repeat: 0,
    });

    this.anims.play("shootBossTwo", true);
    this.on("animationcomplete", this.animationComplete, this);
  }

  animationComplete(animation, frame) {
    if (animation.key == "reload" || animation.key == "chargeBossTwo") {
      this.anims.play("shootBossTwo", true);
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
      }
      this.updateHealthBar();
    }
  }

  attack() {
    if (this.isDead == false) {
      this.anims.play("reload", true);
      this.attacking = true;
      this.shoot();
      this.scene.time.delayedCall(250, () => {
        this.shoot();
      });
      this.scene.time.delayedCall(500, () => {
        this.shoot();
      });
      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 10000,
      });
    }
  }

  shoot() {
    const shot = new BossTwoShot(this.scene, this.x, this.y);
    this.scene.enemiesShotGroup.add(shot);
    this.scene.physics.moveTo(
      shot,
      this.scene.player.x,
      this.scene.player.y,
      250
    );
  }

  onTimerComplete() {
    if (this.isDead == false) {
      this.attacking = true;
      this.body.reset(this.x, this.y);
      this.body.setImmovable(true);
      if (Phaser.Math.Between(1, 6) > 4) {
        this.rage();
      } else {
        this.attack();
      }
    }
  }

  dead() {
    this.isDead = true;
    this.loadBar.destroy();
    this.progressBar.destroy();
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
