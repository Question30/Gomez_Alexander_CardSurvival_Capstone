import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Leaderboard from "../components/Leaderboard";
function LeaderboardPage() {
  const tempTopScores = [
    {
      name: "Alex",
      score: 30000,
    },
    {
      name: "John",
      score: 25000,
    },
    {
      name: "Jane",
      score: 22000,
    },
    {
      name: "Kage",
      score: 18000,
    },
    {
      name: "Juj",
      score: 15000,
    },
  ];
  const tempTopTimes = [
    {
      name: "Alex",
      score: "30:00",
    },
    {
      name: "John",
      score: "25:00",
    },
    {
      name: "Jane",
      score: "22:00",
    },
    {
      name: "Kage",
      score: "18:00",
    },
    {
      name: "Juj",
      score: "15:00",
    },
  ];

  return (
    <div>
      <NavBar links={["Home", "Play", "Support", "Login/Signup"]} />
      <main className="mx-auto flex flex-col items-center gap-12 my-28">
        <h1 className="font-bold text-2xl underline">Top Scores</h1>
        <Leaderboard
          heading="Top 5 Scores"
          colNames={["Rank", "Username", "Score"]}
          scores={tempTopScores}
        />
        <h1 className="font-bold text-2xl underline">Top Times</h1>
        <Leaderboard
          heading="Top 5 Times"
          colNames={["Rank", "Username", "Time"]}
          scores={tempTopTimes}
        />
        <Footer />
      </main>
    </div>
  );
}

export default LeaderboardPage;
