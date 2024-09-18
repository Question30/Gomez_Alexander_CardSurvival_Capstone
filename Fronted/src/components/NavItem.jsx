import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as userService from "../utilities/users-service";

function NavItem({ link, setUser }) {
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
      case "Logout":
        result = "";
        break;
      default:
        result = "/";
        break;
    }

    return result;
  };

  const handleLogOut = (event) => {
    if (event.target.innerHTML == "Logout") {
      userService.logout();
      setUser(null);
    }
  };

  return (
    <Link
      className="p-4 no-underline text-slate-300 block  hover:text-slate-500 text-2xl"
      to={getPath(link)}
      onClick={handleLogOut}
    >
      {link}
    </Link>
  );
}

export default NavItem;
