import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <NavBar links={["Play", "Leaderboard", "Support", "Login/Signup"]} />

      {showLogin ? (
        <LoginForm setShowLogin={setShowLogin} showLogin={showLogin} />
      ) : (
        <SignupForm setShowLogin={setShowLogin} showLogin={showLogin} />
      )}

      <Footer />
    </>
  );
}

export default AuthPage;
