import React from "react";
import { Link } from "react-router-dom";

function NavItem({ link }) {
  const getPath = (link) => {
    let result = "";
    switch (link) {
      case "Play":
        result = "/game";
        break;
      case "Leaderboard":
        result = "/leaderboard";
        break;
      case "Support":
        result = "/support";
        break;
      case "Login/Signup":
        result = "/auth";
        break;
      default:
        result = "/";
        break;
    }

    return result;
  };

  return (
    <Link
      className="p-2 no-underline text-slate-300 block  hover:text-slate-500 text-2xl"
      to={getPath(link)}
    >
      {link}
    </Link>
  );
}

export default NavItem;
