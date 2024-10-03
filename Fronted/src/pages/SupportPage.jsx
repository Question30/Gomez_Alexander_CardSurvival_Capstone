import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SupportForm from "../components/SupportForm";

function SupportPage() {
  return (
    <div>
      <NavBar links={["Home", "Play", "Leaderboard", "Login/Signup"]} />
      <h2 className="text-center py-6 text-2xl font-bold">
        Have an issue or question? Complete the form below.
      </h2>
      <main className="flex flex-col items-center  w-10/12 mx-auto my-2">
        <SupportForm />
      </main>
      <Footer />
    </div>
  );
}

export default SupportPage;
