import Player from "../GameObjects/player";
import EnemyGenerator from "../GameObjects/generateEnemies";
import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.player = null;
    this.enemy = null;
  }

  init() {
    this.number = 1;
  }

  preload() {}

  create() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    this.cameras.main.setBackgroundColor(0x87ceeb);
    this.player = new Player(this, this.center_width, this.center_height);

    this.addEnemies();
    this.addShots();
    this.addColliders();
  }

  update() {
    this.player.update();
    this.enemies.update();
  }

  addEnemies() {
    this.enemiesGroup = this.add.group();
    this.addEnemiesWaveGroup = this.add.group();
    this.enemies = new EnemyGenerator(this);
  }

  addShots() {
    this.shots = this.add.group();
  }

  addColliders() {
    this.physics.add.collider(
      this.enemiesGroup,
      this.player,
      this.killPlayer,
      () => {
        true;
      },
      this
    );

    this.physics.add.collider(
      this.shots,
      this.enemiesGroup,
      this.destroyEnemy,
      () => {
        true;
      },
      this
    );

    this.physics.add.overlap(
      this.shots,
      this.enemiesGroup,
      this.destroyEnemy,
      () => {
        return true;
      },
      this
    );

    this.physics.world.on("worldbounds", this.onWorldBounds);
  }

  onWorldBounds(body, t) {
    const name = body.gameObject.name.toString();
    if (["foeshot", "shot"].includes(name)) {
      body.gameObject.destroy();
    }
  }

  destroyEnemy(shot, enemy) {
    enemy.dead();
    shot.destroy();
  }

  killPlayer(enemy, player) {
    this.shots.destroy();
    player.dead();
  }
}
