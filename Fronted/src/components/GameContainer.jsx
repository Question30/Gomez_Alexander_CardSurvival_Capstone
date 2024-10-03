import PropTypes from "prop-types";
import { useEffect, useLayoutEffect, useRef, forwardRef } from "react";
import StartGame from "../Game/Scenes/startGame";
import { EventBus } from "../Game/Scenes/eventbus";

export const GameContainer = forwardRef(function GameContainer(
  { currentActiveScene },
  ref
) {
  const game = useRef();

  useLayoutEffect(() => {
    if (game.current === undefined) {
      game.current = StartGame("game_container");

      if (ref !== null) {
        ref.current = { game: game.current, scene: null };
      }
    }

    return () => {
      if (game.current) {
        game.current.destroy(true);
        game.current = undefined;
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on("current-scene-ready", (currentScene) => {
      if (currentActiveScene instanceof Function) {
        currentActiveScene(currentScene);
      }
      ref.current.scene = currentScene;
    });

    return () => {
      EventBus.removeListener("current-scene-ready");
    };
  }, [currentActiveScene, ref]);

  return <div id="game_container" className="border  mx-auto "></div>;
});

GameContainer.propTypes = {
  currentActiveScene: PropTypes.func,
};
