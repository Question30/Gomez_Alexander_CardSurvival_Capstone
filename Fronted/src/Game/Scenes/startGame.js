import Phaser from "phaser";
import Loader from "./loader";
import Splash from "./splash";
import Transition from "./transition";
import Game from "./game";
import Outro from "./outro";

const config = {
  width: 1000,
  height: 650,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: "game_container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Loader, Splash, Transition, Game, Outro],
};

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
