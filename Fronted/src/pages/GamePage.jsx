import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { GameContainer } from "../components/GameContainer";
import { useRef } from "react";
import * as usersService from "../utilities/users-service";
import playerGif from "../assets/gifs/player.gif";
import redPowerupGif from "../assets/gifs/redPowerup.gif";
import greenPowerupGif from "../assets/gifs/greenPowerup.gif";
import bluePowerupGif from "../assets/gifs/bluePowerup.gif";
import enemyGif from "../assets/gifs/enemy.gif";
import turretGif from "../assets/gifs/turret.gif";
import bossOneGif from "../assets/gifs/bossOne.gif";
import bossTwoGif from "../assets/gifs/bossTwo.gif";
import bossThreeGif from "../assets/gifs/bossThree.gif";

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
      <div className="flex">
        <div className="p-5">
          <div className=" flex">
            <div>
              <h1 className="text-3xl">Instructions:</h1>
              <p className="text-2xl">Movement: WASD or Arrow keys</p>
              <p className="text-2xl">Aim your shots with the cursor</p>
            </div>
            <img
              className="self-end w-16 mr-5"
              src={playerGif}
              alt="Player Gif"
            />
          </div>
          <div>
            <h2 className="text-2xl">Power UPs:</h2>
            <div className="flex items-center">
              <p className="text-xl">Red: Attack Speed</p>
              <img
                className="mx-10"
                src={redPowerupGif}
                alt="Red Power up card gif"
              />
            </div>
            <div className="flex items-center">
              <p className="text-xl">Green: Movement Speed</p>
              <img
                className="mx-10"
                src={greenPowerupGif}
                alt="GreenPower up card gif"
              />
            </div>
            <div className="flex items-center">
              <p className="text-xl">Blue: Extra Throwing Card</p>
              <img
                className="mx-10"
                src={bluePowerupGif}
                alt="Blue Power up card gif"
              />
            </div>
            <div>
              <h2 className="text-2xl">Enemies:</h2>
              <div className="flex items-center">
                <p className="text-xl">Slime:</p>
                <img src={enemyGif} alt="Slime Gif" />
              </div>
              <div className="flex items-center">
                <p className="text-xl">Turret Slime:</p>
                <img className="w-16" src={turretGif} alt="Turret Slime Gif" />
              </div>
              <div className="flex items-center">
                <p className="text-xl">Boss One: "Type Stuff"</p>
                <img className="w-16" src={bossOneGif} alt="Boss One Gif" />
              </div>
              <div className="flex items-center">
                <p className="text-xl">Boss Two: "Trash Panda"</p>
                <img className="w-24" src={bossTwoGif} alt="Boss Two Gif" />
              </div>
              <div className="flex items-center">
                <p className="text-xl">Boss Three "Goteem"</p>
                <img src={bossThreeGif} alt="Boss Three Gif" />
              </div>
            </div>
          </div>
        </div>
        <GameContainer ref={phaserRef} currentActiveScene={currentScene} />
      </div>
      <Footer />
    </div>
  );
}

export default GamePage;
