import React, { memo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";

function Navbar({ showBar }) {
  const navigate = useNavigate();
  const elem = useRef();

  function handleLogout(e) {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav
      className={`sticky top-0 z-10 ${
        showBar ? "bg-[#080a1a]" : "bg-[#080a1a40]"
      } flex items-center justify-between py-5 px-5 w-full`}
    >
      <div className="w-full gap-5 flex flex-col justify-between items-center md:flex-row md:gap-0 " >
        <div className="flex items-center">
          <Link className="h-10 text-center" to={"/"}>
            <img
              src="https://fontmeme.com/permalink/230620/d849efc19dda4821037c2fb4a746ed19.png"
              className="h-[100%]"
              alt="Netflix-logo"
            />
          </Link>
          <div className="flex mx-10 gap-x-4 font-sans items-center">
            <div>
              <Link to={"/"} className="text-white hover:text-slate-200">
                Home
              </Link>
            </div>
            <div>
              <Link to={"/movies"} className="text-white hover:text-slate-200">
                Movies
              </Link>
            </div>
            <div>
              <Link
                to={"/favourite"}
                className="text-white hover:text-slate-200"
              >
                Favourites
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 search-logs justify-center">
          <form
            className="flex items-cente bg-white h-full rounded-sm overflow-hidden "
            action="/search"
            method="get"
          >
            <button title="Search" className="bg-[#f34242] p-2 rounded-r-[3px]">
              <FaSearch className={"text-xl text-[#fff]"} />
            </button>
            <input
              type="text"
              name="q"
              id="search-bar"
              placeholder="Search here"
              className={` rounded px-3 py-2 bg-transparent outline-none `}
              autoComplete="off"
            />
          </form>
          <button onClick={(e) => handleLogout()} title="Logout">
            <FaPowerOff
              className={"text-xl text-[#f34242] active:text-[#f34242b6]"}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
