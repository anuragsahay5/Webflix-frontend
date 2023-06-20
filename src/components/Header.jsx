import React, { memo } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header flex items-center justify-around py-5">
      <Link to={"/"}>
        <img
          src="https://fontmeme.com/permalink/230620/d849efc19dda4821037c2fb4a746ed19.png"
          alt="netflix_logo"
          className="h-12"
        />
      </Link>
      <Link
        to={"/login"}
        className="bg-[#e50914] text-white px-4 hy-1 rounded-sm font-medium"
      >
        Sign In
      </Link>
    </div>
  );
}

export default memo(Header);
