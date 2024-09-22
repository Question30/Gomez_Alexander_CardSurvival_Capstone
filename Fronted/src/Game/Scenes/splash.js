import Phaser from "phaser";

export default class Splash extends Phaser.Scene {
  constructor() {
    super({ key: "splash" });
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);

    this.input.keyboard.on(
      "keydown-SPACE",
      () => this.transitionToChange(),
      this
    );
  }

  transitionToChange() {
    this.scene.start("transition", {
      next: "game",
      name: "STAGE",
      number: 1,
    });
  }

  showInstructions() {
    this.space = this.add
      .bitmapText(
        this.center_width,
        this.center_height,
        "arcade",
        "Press SPACE to start",
        60
      )
      .setOrigin(0.5)
      .setDropShadow(3, 4, 0x222222, 0.7);
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true,
    });
  }
}
