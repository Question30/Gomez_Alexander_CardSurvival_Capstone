import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import GameContainer from "../components/GameContainer";

function GamePage() {
  return (
    <div>
      <NavBar links={["Home", "Leaderboard", "Support", "Login/Signup"]} />
      <GameContainer />
      <Footer />
    </div>
  );
}

export default GamePage;
