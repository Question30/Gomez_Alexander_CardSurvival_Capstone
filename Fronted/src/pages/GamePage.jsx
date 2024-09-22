import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GameContainer from "../components/GameContainer";
import Game from "../Game/Scenes/game";
import Loader from "../Game/Scenes/loader";
import Splash from "../Game/Scenes/splash";
import Transition from "../Game/Scenes/transition";
import Phaser from "phaser";

function GamePage() {
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
    scene: [Loader, Splash, Transition, Game],
  };
  return (
    <div>
      <NavBar links={["Home", "Leaderboard", "Support", "Login/Signup"]} />
      <GameContainer config={config} />
      <Footer />
    </div>
  );
}

export default GamePage;
