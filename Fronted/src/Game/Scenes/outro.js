import Phaser from "phaser";

export default class Outro extends Phaser.Scene {
  constructor() {
    super({ key: "outro" });
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.time.delayedCall(1000, () => this.showInstructions(), null, this);

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
    this.add.text(
      this.center_width - 200,
      this.center_height - 80,
      "GAME OVER",
      {
        fontSize: 80,
      }
    );
    this.space = this.add.text(
      this.center_width - 300,
      this.center_height,
      "press SPACE to play again",
      { fontSize: 40 }
    );
    this.tweens.add({
      targets: this.space,
      duration: 300,
      alpha: { from: 0, to: 1 },
      repeat: -1,
      yoyo: true,
    });
  }
}
