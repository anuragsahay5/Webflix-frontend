import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_KEY, API_BASE_URL } from "../secret";

function BrandCard({ movieId }) {
  const navigate = useNavigate();
  const [brandInfo, setbrandInfo] = useState({
    backdrop: "",
    title: "",
    poster: "",
  });

  async function loadCard() {
    const res = await axios.get(
      `${API_BASE_URL}/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`
    );

    setbrandInfo({
      backdrop: res.data.backdrop_path,
      title: res.data.title,
      poster: res.data.poster_path,
    });
  }

  useEffect(() => {
    loadCard();
  }, [movieId]);

  return (
    <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/original${brandInfo.backdrop}`}
        alt="_Backdrop"
        className="w-[100%] h-[100vh]"
      />
      <div className="title absolute top-[80vh] text-[#ffd900fe] font-bold sm:text-xl md:text-2xl lg:text-3xl  ml-20">
        {brandInfo.title}
      </div>
      <div className="brand-controls flex items-center gap-4 absolute top-[90vh] ml-20 font-semibold">
        <div
          className="bg-[#f20000] flex items-center gap-1 rounded-sm px-3 py-1 text-white cursor-pointer"
          onClick={() => navigate("/player")}
        >
          <FaPlay /> Watch
        </div>
        <div
          className="bg-[#494949ae] text-white flex items-center gap-1 rounded-sm px-3 py-1 cursor-pointer"
          onClick={() => navigate(`/movies/${movieId}`)}
        >
          <FaInfoCircle />
          More Info
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${brandInfo.poster}`}
        alt="_Poster"
        className="absolute h-[40%] bottom-5 right-5 opacity-70 hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
}

export default memo(BrandCard);
