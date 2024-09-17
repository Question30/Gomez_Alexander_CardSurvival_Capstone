import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer class="fixed left-0 bottom-0 w-screen bg-slate-800 flex justify-between">
      <div
        class="flex justify-around items-center basis-4/12"
        id="icons-container"
      >
        <a href="" class="icons">
          <FaGithub size="1.25em" color="white" />
        </a>
        <a href="" class="icons">
          <FaLinkedin size="1.25em" color="white" />
        </a>
        <a href="" class="icons">
          <FaEnvelope size="1.25em" color="white " />
        </a>
      </div>
      <div id="created">
        <p class="m-0 p-0 text-slate-200 " id="tag">
          Created by Alexander Gomez
        </p>
      </div>
    </footer>
  );
}

export default Footer;
