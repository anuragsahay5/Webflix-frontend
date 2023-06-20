import React from "react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer border-t text-white flex justify-between items-center py-10 px-3 font-semibold bg-black">
      <div className="lg:text-2xl md:text-xl sm:text-lg flex justify-center items-center space-x-2">
        Copyright © made by Anurag Sahay
      </div>
      <div className="text-white flex items-center lg:text-4xl md:text-3xl sm:text-2xl space-x-2">
        <Link to={"https://github.com/anuragsahay5"}>
          <FaGithub />
        </Link>
        <Link to={"https://in.linkedin.com/in/anurag-sahay-7523bb220"}>
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
}
