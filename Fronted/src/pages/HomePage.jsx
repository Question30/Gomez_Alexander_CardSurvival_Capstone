import NavBar from "../components/NavBar";
import palcehoder from "../assets/placeholder.png";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div>
      <NavBar links={["Play", "Leaderboard", "Support", "Login/Signup"]} />
      <div className="flex flex-col xl:flex-row justify-center w-full xl:border-b-black xl:border-b-2  xl:max-h-[500px] overflow-hidden">
        <div className="xl:border-r-black xl:border-r-2 xl:w-1/2 w-full border-b-black border-b-2 object-contain h-[500px]">
          <img className="w-3/4 h-full m-auto" src={palcehoder} alt="" />
        </div>
        <section className="xl:w-1/2 min-h-full pt-10">
          <h2 className="text-center underline text-6xl">About the game</h2>
          <p className=" p-5 text-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
            incidunt alias quia eius necessitatibus qui minus dolorem similique
            ducimus quo doloribus cumque consequatur aspernatur iusto magni,
            sequi sapiente distinctio excepturi? Corrupti, mollitia fuga?
            Quisquam, doloremque quis nam, saepe quas cumque iusto enim, magni
            quidem animi repudiandae! Quaerat exercitationem ipsa nisi
            repellendus commodi provident, officia at, ea dolores consectetur
            aut minima. Fuga error asperiores doloremque, libero voluptatum
            cumque officiis deleniti animi provident! Soluta ratione, repellat
            atque veritatis corrupti officiis earum doloremque voluptas ex
            itaque, sapiente, cum voluptate consectetur qui. Architecto,
            similique!
          </p>
        </section>
      </div>
      <div className="bg-green-600 flex justify-center w-7/12 h-40 rounded-full items-center my-24 mx-auto ">
        <button className="text-9xl text-slate-200">PLAY</button>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
