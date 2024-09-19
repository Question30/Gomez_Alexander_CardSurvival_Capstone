import Player from "../GameObjects/player";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.player = null;
  }

  init() {}

  preload() {}

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.player = new Player(
      this,
      this.center_width - 100,
      this.center_height - 200
    );

    this.addShots();
    this.addColliders();
  }

  update() {
    this.player.update();
  }

  addShots() {
    this.shots = this.add.group();
  }

  addColliders() {
    this.physics.world.on("worldbounds", this.onWorldBounds);
  }

  onWorldBounds(body, t) {
    const name = body.gameObject.name.toString();
    if (["foeshot", "shot"].includes(name)) {
      body.gameObject.destroy();
    }
  }
}
