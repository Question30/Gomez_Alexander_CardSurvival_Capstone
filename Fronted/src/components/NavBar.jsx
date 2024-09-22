import NavItem from "./NavItem";
import { useState, useEffect } from "react";
import * as userService from "../utilities/users-service";

export default function NavBar({ links }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = userService.getToken();
    if (token !== null) {
      const user = userService.getUser();
      setUser(user);
    }
  }, []);

  console.log(user);
  const linkArray = () => {
    let linkArr = [...links];
    if (user) {
      linkArr.splice(linkArr.indexOf("Login/Signup"), 1, "Logout");
    }

    return linkArr;
  };
  return (
    <nav className="bg-slate-800 flex justify-between items-center px-2.5 min-w-full">
      {user ? (
        <div className="text-slate-200">Welcome {user}</div>
      ) : (
        <div>Logo</div>
      )}
      {linkArray().map((link, index) => (
        <NavItem key={index} link={link} setUser={setUser} />
      ))}
    </nav>
  );
}
