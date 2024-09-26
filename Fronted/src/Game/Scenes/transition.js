import Phaser from "phaser";

export default class Transition extends Phaser.Scene {
  constructor() {
    super({ key: "transition" });
  }

  init(data) {
    this.name = data.name;
    this.number = data.number;
    this.next = data.next;
  }

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.time.delayedCall(1000, () => this.loadNext(), null, this);
  }

  loadNext() {
    this.scene.start(this.next, {
      name: this.name,
      number: this.number,
      time: this.time,
    });
  }
}
