import NavBar from "../components/NavBar";
import screenShot from "../assets/game.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <NavBar links={["Play", "Leaderboard", "Support", "Login/Signup"]} />
      <div className="flex flex-col xl:flex-row justify-center w-full xl:border-b-black xl:border-b-2  xl:max-h-[500px] overflow-hidden">
        <div className="xl:border-r-black xl:border-r-2 xl:w-1/2 w-full border-b-black border-b-2 object-contain h-[400px]">
          <img className="w-3/4 h-full m-auto" src={screenShot} alt="" />
        </div>
        <section className="xl:w-1/2 min-h-full pt-10 md:border-b-black border-b-2">
          <h2 className="text-center underline text-6xl">About the game</h2>
          <p className=" p-5 text-2xl my-5">
            Welcome to Card Survival Game, where the goal is to survive 10 waves
            without getting hit. Move your player with the W A S D keys and aim
            your shots with the mouse. You gain a power up after each wave. Can
            you survive all 10 waves and become the top scorer?!
          </p>
        </section>
      </div>
      <div className="bg-green-600 flex justify-center w-7/12 h-40 rounded-full items-center my-10 mx-auto ">
        <Link to={"/game"} className="text-9xl text-slate-200">
          PLAY
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
