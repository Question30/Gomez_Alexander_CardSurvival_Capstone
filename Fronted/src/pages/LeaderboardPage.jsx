import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
import { useEffect, useState } from "react";
import * as scoresService from "../utilities/scores-service";
function LeaderboardPage() {
  const [topScores, setTopScores] = useState([]);
  const [topTimes, setTopTimes] = useState([]);

  useEffect(() => {
    const getTopScores = async () => {
      try {
        const scores = await scoresService.getTopScores();
        setTopScores(scores);
      } catch (e) {
        console.error(e);
      }
    };
    const getTopTimes = async () => {
      try {
        const times = await scoresService.getTopTimes();
        setTopTimes(times);
      } catch (e) {
        console.error(e);
      }
    };

    getTopScores();
    getTopTimes();
  }, []);

  // console.log(topScores, topTimes);

  return (
    <div>
      <NavBar links={["Home", "Play", "Support", "Login/Signup"]} />
      <main className="mx-auto flex flex-col items-center gap-12 my-28">
        <h1 className="font-bold text-2xl underline">Top Scores</h1>

        {topScores.length > 0 ? (
          <Leaderboard
            heading="Top 5 Scores"
            colNames={["Rank", "Username", "Score"]}
            scores={topScores}
          />
        ) : (
          <h2>No Scores to Display</h2>
        )}
        {topTimes.length > 0 ? (
          <Leaderboard
            heading="Top 5 Scores"
            colNames={["Rank", "Username", "Time"]}
            scores={topTimes}
          />
        ) : (
          <h2>No Times to Display</h2>
        )}
        <Footer />
      </main>
    </div>
  );
}

export default LeaderboardPage;
