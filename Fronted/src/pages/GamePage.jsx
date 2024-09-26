import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { GameContainer } from "../components/GameContainer";
import { useRef } from "react";

function GamePage() {
  const phaserRef = useRef();

  const currentScene = (scene) => {
    console.log(scene);
  };

  return (
    <div>
      <NavBar links={["Home", "Leaderboard", "Support", "Login/Signup"]} />
      <GameContainer ref={phaserRef} currentActiveScene={currentScene} />
      <Footer />
    </div>
  );
}

export default GamePage;
