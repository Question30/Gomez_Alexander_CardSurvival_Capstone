import Phaser from "phaser";

export default class Arrow extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name = "bossTwoArrow") {
    super(scene, x, y, name);
  }
}
