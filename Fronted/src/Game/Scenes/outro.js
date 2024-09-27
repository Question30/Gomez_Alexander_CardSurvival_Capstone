import Phaser from "phaser";
import { EventBus } from "./eventbus";

export default class Outro extends Phaser.Scene {
  constructor() {
    super({ key: "outro" });
  }

  init(data) {
    this.score = data.score;
    this.totalTime = data.time;
    this.completed = data.completed;
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.time.delayedCall(1000, () => this.showInstructions(), null, this);

    this.showData();

    // this.score = this.registry.get("score");

    this.input.keyboard.on(
      "keydown-SPACE",
      () => this.transitionToChange(),
      this
    );

    EventBus.emit("current-scene-ready", this);
  }

  showData() {
    this.add.text(
      this.center_width - 100,
      this.center_height - 160,
      "Score: " + this.score,
      { fontSize: 40 }
    );

    let calcdHour = Math.floor(this.totalTime / 1000 / 60 / 60);
    let calcdMinutes = Math.floor(this.totalTime / 1000 / 60) - 60 * calcdHour;
    let calcDseconds = Math.floor(this.totalTime / 1000) - 60 * calcdMinutes;
    let hour = calcdHour < 10 ? "0" + calcdHour : calcdHour;
    let minutes = calcdMinutes < 10 ? "0" + calcdMinutes : calcdMinutes;
    let seconds = calcDseconds < 10 ? "0" + calcDseconds : calcDseconds;
    this.add.text(
      this.center_width - 200,
      this.center_height - 240,
      "Time: " + hour + ":" + minutes + ":" + seconds,
      { fontSize: 40 }
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
    const text = this.completed ? "YOU WIN" : "GAME OVER";
    this.add.text(this.center_width - 200, this.center_height - 80, text, {
      fontSize: 80,
    });
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
