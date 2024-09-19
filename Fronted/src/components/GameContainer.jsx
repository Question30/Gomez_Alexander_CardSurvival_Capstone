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
      // className="border my-20 mx-auto bg-gray-500 w-10/12 min-h-[700px]"
    ></div>
  );
}

export default GameContainer;
