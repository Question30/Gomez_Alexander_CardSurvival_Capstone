import Shot from "./shot";
import Phaser from "phaser";

class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, 32, 32, 0x00ff00);
    this.setOrigin(0.5);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.5);
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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
  }
  init() {
    this.alive = true;
    this.timer = this.scene.time.addEvent({
      callback: this.onTimerComplete,
      callbackScope: this,
      delay: 1000,
    });
  }

  update() {
    if (this.W.isDown) {
      this.y -= 1.5;
      this.setFacing("UP");
    } else if (this.A.isDown) {
      this.x -= 1.5;
      this.setFacing("LEFT");
    } else if (this.S.isDown) {
      this.y += 1.5;
      this.setFacing("DOWN");
    } else if (this.D.isDown) {
      this.x += 1.5;
      this.setFacing("RIGHT");
    }
  }

  onTimerComplete() {
    if (this.alive) {
      this.shoot();
      this.timer.reset({
        callback: this.onTimerComplete,
        callbackScope: this,
        delay: 1000,
      });
    }
  }

  shoot() {
    const { mouseX, mouseY } = this.getMouseCoords();

    this.shot = new Shot(this.scene, this.x, this.y, this.name, mouseX, mouseY);

    this.scene.shots.add(this.shot);

    this.scene.physics.moveTo(this.shot, mouseX, mouseY, 100);
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
    this.shot.destroy();
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
    // Takes a Camera and updates this Pointer's worldX and worldY values so they are the result of a translation through the given Camera.
  }
}

export default Player;
