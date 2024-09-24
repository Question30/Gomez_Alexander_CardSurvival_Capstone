import Phaser from "phaser";
import { useEffect } from "react";

function GameContainer({ config }) {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      id="game_container"
      // className="border my-20 mx-auto bg-gray-500 w-4/5 "
    ></div>
  );
}

export default GameContainer;
