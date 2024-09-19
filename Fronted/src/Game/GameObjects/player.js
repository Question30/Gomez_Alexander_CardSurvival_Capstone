import Shot from "./shot";

class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, number) {
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

    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.shoot();
    }
  }

  shoot() {
    if (this.facing.DOWN) {
      this.scene.shots.add(
        new Shot(this.scene, this.x, this.y, this.name, 0, 100)
      );
    } else if (this.facing.UP) {
      this.scene.shots.add(
        new Shot(this.scene, this.x, this.y, this.name, 0, -100)
      );
    } else if (this.facing.RIGHT) {
      this.scene.shots.add(
        new Shot(this.scene, this.x, this.y, this.name, 100, 0)
      );
    } else if (this.facing.LEFT) {
      this.scene.shots.add(
        new Shot(this.scene, this.x, this.y, this.name, -100, 0)
      );
    }
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
}

export default Player;
