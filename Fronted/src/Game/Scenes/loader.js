import Phaser from "phaser";
import playerPng from "../../assets/images/player.png";
import enemyPng from "../../assets/images/enemy.png";
import BossOnePng from "../../assets/images/bossOne.png";
import BossTwoPng from "../../assets/images/bossTwo.png";
import BossThreePng from "../../assets/images/bossThree.png";
import bossTwoArrow from "../../assets/images/bossTwoArrow.png";

export default class Loader extends Phaser.Scene {
  constructor() {
    super({ key: "loader" });
  }

  //Call load functions
  preload() {
    this.createBars();
    this.setLoadEvents();
    this.loadSpriteSheets();
    this.setRegistry();
  }

  //Events to control loading bar
  setLoadEvents() {
    this.load.on(
      "progress",
      function (value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x0088aa, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    this.load.on(
      "complete",
      () => {
        this.scene.start("splash");
      },
      this
    );
  }

  //Function to load Images
  loadImages() {}

  //Function to load Audio
  loadAudios() {}

  //Function to load SpriteSheets
  loadSpriteSheets() {
    this.load.spritesheet("player", playerPng, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("enemy", enemyPng, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bossOne", BossOnePng, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("bossTwo", BossTwoPng, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("bossThree", BossThreePng, {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("bossTwoArrow", bossTwoArrow, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  //To Load Fonts
  loadFonts() {}

  //Set intial values to the registry
  setRegistry() {
    this.registry.set("score", 0);
  }

  //Create loading Bars
  createBars() {
    this.loadBar = this.add.graphics();
    this.loadBar.fillStyle(0xd40000, 1);
    this.loadBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}
