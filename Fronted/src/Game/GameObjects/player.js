import Shot from "./shot";
import Phaser from "phaser";

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "player") {
    super(scene, x, y, name);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(1);
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.cursor = this.scene.input.keyboard.createCursorKeys();
    this.SPACE = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.body.setCollideWorldBounds(true);
    this.x = x;
    this.y = y;
    this.name = "player";
    this.facing = {
      LEFT: false,
      RIGHT: false,
      UP: false,
      DOWN: true,
    };

    this.alive = false;
    this.init();
    this.attackSpd = 1000;
    this.moveSpd = 1.5;
    this.bullets = 1;
    this.canMove = true;
  }
  init() {
    this.alive = true;
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: this.attackSpd,
    });
    this.addAnimations();
  }

  addAnimations() {
    this.scene.anims.create({
      key: "shoot",
      frames: this.anims.generateFrameNumbers(this.name, { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    });
  }

  update() {
    if (this.canMove) {
      if (this.W.isDown || this.cursor.up.isDown) {
        this.y -= this.moveSpd;
        this.setFacing("UP");
      }
      if (this.A.isDown || this.cursor.left.isDown) {
        this.x -= this.moveSpd;
        this.setFacing("LEFT");
      }
      if (this.S.isDown || this.cursor.down.isDown) {
        this.y += this.moveSpd;
        this.setFacing("DOWN");
      }
      if (this.D.isDown || this.cursor.right.isDown) {
        this.x += this.moveSpd;
        this.setFacing("RIGHT");
      }
    }
  }

  onTimerComplete() {
    if (this.alive && this.canMove) {
      this.shoot();
      this.resetTimer();
    }
  }

  resetTimer() {
    this.timer.reset({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: this.attackSpd,
    });
  }

  shoot() {
    const { mouseX, mouseY } = this.getMouseCoords();

    if (this.bullets == 1) {
      const shot = new Shot(
        this.scene,
        this.x,
        this.y,
        this.name,
        mouseX,
        mouseY
      );

      this.scene.shots.add(shot);

      this.scene.physics.moveTo(shot, mouseX, mouseY, 200);
    } else if (this.bullets == 2) {
      const shot1 = new Shot(
        this.scene,
        this.x,
        this.y,
        this.name,
        mouseX,
        mouseY
      );
      const shot2 = new Shot(
        this.scene,
        shot1.x + 12,
        shot1.y + 12,
        this.name,
        mouseX,
        mouseY
      );
      this.scene.shots.add(shot1);

      this.scene.physics.moveTo(shot1, mouseX, mouseY, 200);
      this.scene.shots.add(shot2);

      this.scene.physics.moveTo(shot2, mouseX + 10, mouseY + 10, 200);
    } else if (this.bullets == 3) {
      const shot1 = new Shot(
        this.scene,
        this.x,
        this.y,
        this.name,
        mouseX,
        mouseY
      );
      const shot2 = new Shot(
        this.scene,
        shot1.x + 12,
        shot1.y + 12,
        this.name,
        mouseX,
        mouseY
      );
      const shot3 = new Shot(
        this.scene,
        shot1.x - 12,
        shot1.y - 12,
        this.name,
        mouseX,
        mouseY
      );
      this.scene.shots.add(shot1);

      this.scene.physics.moveTo(shot1, mouseX, mouseY, 200);
      this.scene.shots.add(shot2);

      this.scene.physics.moveTo(shot2, mouseX + 30, mouseY + 30, 200);
      this.scene.shots.add(shot3);

      this.scene.physics.moveTo(shot3, mouseX - 30, mouseY - 30, 200);
    } else {
      const shot1 = new Shot(
        this.scene,
        this.x,
        this.y,
        this.name,
        mouseX,
        mouseY
      );
      const shot2 = new Shot(
        this.scene,
        shot1.x + 12,
        shot1.y + 12,
        this.name,
        mouseX,
        mouseY
      );
      const shot3 = new Shot(
        this.scene,
        shot1.x - 12,
        shot1.y - 12,
        this.name,
        mouseX,
        mouseY
      );
      const shot4 = new Shot(
        this.scene,
        shot3.x + 12,
        shot3.y + 12,
        this.name,
        mouseX,
        mouseY
      );
      const shot5 = new Shot(
        this.scene,
        shot2.x - 12,
        shot2.y - 12,
        this.name,
        mouseX,
        mouseY
      );
      this.scene.shots.add(shot1);

      this.scene.physics.moveTo(shot1, mouseX, mouseY, 200);
      this.scene.shots.add(shot2);

      this.scene.physics.moveTo(shot2, mouseX + 30, mouseY + 30, 200);
      this.scene.shots.add(shot3);

      this.scene.physics.moveTo(shot3, mouseX - 30, mouseY - 30, 200);
      this.scene.shots.add(shot4);

      this.scene.physics.moveTo(shot4, mouseX - 60, mouseY - 60, 200);
      this.scene.shots.add(shot5);

      this.scene.physics.moveTo(shot5, mouseX + 60, mouseY + 60, 200);
    }

    this.anims.play("shoot", true);
  }

  setFacing(direction) {
    for (const key in this.facing) {
      if (key == direction) {
        this.facing[key] = true;
      } else {
        this.facing[key] = false;
      }
    }
  }

  dead() {
    this.destroy();
    this.alive = false;
  }

  getMouseCoords() {
    if (this.alive) {
      this.scene.input.activePointer.updateWorldPoint(this.scene.cameras.main);
      const pointer = this.scene.input.activePointer;

      return {
        mouseX: pointer.worldX,
        mouseY: pointer.worldY,
      };
    }
  }
}

export default Player;
