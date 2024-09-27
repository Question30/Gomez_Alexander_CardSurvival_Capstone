import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { GameContainer } from "../components/GameContainer";
import { useRef } from "react";
import * as usersService from "../utilities/users-service";

function GamePage() {
  const phaserRef = useRef();

  const currentScene = (scene) => {
    if (scene.scene.key == "outro") {
      const time = formatTime(scene.totalTime);
      const score = {
        score: scene.score,
        time: time,
        complete: scene.completed,
      };
      usersService.addScore(score);
    }
  };

  const formatTime = (secondsToFormat) => {
    const time = new Date().setTime(secondsToFormat);
    let calcdHour = Math.floor(time / 1000 / 60 / 60);
    let calcdMinutes = Math.floor(time / 1000 / 60) - 60 * calcdHour;
    let calcDseconds = Math.floor(time / 1000) - 60 * calcdMinutes;
    let hour = calcdHour < 10 ? "0" + calcdHour : calcdHour;
    let minutes = calcdMinutes < 10 ? "0" + calcdMinutes : calcdMinutes;
    let seconds = calcDseconds < 10 ? "0" + calcDseconds : calcDseconds;
    const formatedTime = hour + ":" + minutes + ":" + seconds;
    return formatedTime;
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
