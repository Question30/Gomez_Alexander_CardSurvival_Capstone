import React from "react";
import Phaser from "phaser";
import Game from "../Game/Scenes/game";

function GameContainer() {
  const config = {
    width: 1000,
    height: 800,
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
        debug: true,
      },
    },
    scene: [Game],
  };

  const game = new Phaser.Game(config);
  return (
    <div
      id="game_container"
      // className="border my-20 mx-auto bg-gray-500 w-10/12 min-h-[700px]"
    ></div>
  );
}

export default GameContainer;
