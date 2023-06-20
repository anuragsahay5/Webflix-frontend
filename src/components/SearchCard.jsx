import React, { memo, useState } from "react";
import { Rate } from "antd";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchCard({ val }) {
  const [isHovered, setHovered] = useState(0);

  return (

    <div className="card p-2 m-1 h-fit border rounded hover:scale-95 transitions duration-300 border-[#ffffff53] overflow-hidden hover:z-999 inline-block">
      <div
        className="relative"
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(0)}
      >
        <img
          src={`${val.poster_path?`https://image.tmdb.org/t/p/original${val.poster_path}`:"/noimg.png"}`}
          alt="Refresh the page"
          className="text-white"
        />
        <div
          className={`flex flex-col items-center justify-center space-y-1 card-detail absolute top-0 left-0 ${
            isHovered ? "" : "hidden"
          }  bg-[#000000b0] z-1000 h-full w-[100%] text-white`}
        >
          <div className="p-4 bg-[#ffffffa0] rounded-full hover:bg-[#f20000] transition-all duration-300">
            <FaHeart className="" />
          </div>
          <Link
            to={`/movies/${val.id}`}
            className=" card-title sm:text-md lg:text-xl  font-semibold"
            title="Visit Info Page"
          >
            {val.title}
          </Link>
          <div>
            <Rate allowHalf value={val.vote_average / 2} disabled={true} />{" "}
            {val.vote_average.toFixed(1)}/{10}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(SearchCard);
