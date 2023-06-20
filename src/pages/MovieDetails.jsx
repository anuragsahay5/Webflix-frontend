import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaRegCalendarAlt, FaRegClock, FaPlay, FaPlus } from "react-icons/fa";
import { Flip, Slide, ToastContainer, Zoom, toast } from "react-toastify";
import { SERVER_BASE_URL, API_BASE_URL, API_KEY } from "../secret";
export default function MovieDetails({ wo }) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const movieId = useParams().id;
  const [isLoading, setLoading] = useState(false);
  const [movieInfo, setmovieInfo] = useState({
    title: "",
    backdrop_path: "",
    poster_path: "",
    overview: "",
    genres: [],
    original_language: "",
    release_date: "",
    runtime: "",
    vote_average: "",
  });

  const addFavourite = async () => {
    try {
      let res = await axios.put(
        `${SERVER_BASE_URL}/api/addFavourite?id=${userId}`,
        { movieId, title: movieInfo.title, backdrop: movieInfo.backdrop_path }
      );
      if (res.data.msg == "Added Successfully") {
        toast.success(res.data.msg);
      } else {
        toast.info(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMovieInfo = async () => {
    setLoading(true);
    const res = await axios.get(
      `${API_BASE_URL}/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`
    );
    setmovieInfo({ ...movieInfo, ...res.data });
    setLoading(false);
  };

  useEffect(() => {
    loadMovieInfo();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        transition={Slide}
        limit={1}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
      <div className="movie min-h-screen">
        <Navbar showBar={true} />
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div className="movie-details text-white">
            <div
              className="movie-pos-det"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}")`,
                backgroundPosition: "center",
              }}
            >
              <div className="movie-det-inner p-10 bg-[#080a1ad0] flex flex-col justify-center items-center md:flex-row ">
                <img
                  src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
                  alt=""
                  className="h-[500px] block"
                />

                <div className="mov-inf flex-col justify-center items-center w-full space-y-7 mt-3 md:ml-10">
                  <h2 className=" text-xl lg:text-2xl xl:text-4xl font-bold text-center md:text-justify">
                    {movieInfo.title}
                  </h2>
                  <div className="flex space-x-3 items-center">
                    <div className="bg-[#f20000] p-1 text-sm rounded-sm">
                      {movieInfo.original_language}
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaRegCalendarAlt className="text-[#f20000]" />
                      <span className="text-sm">
                        {movieInfo.release_date.slice(0, 7)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaRegClock className="text-[#f20000]" />
                      <span className="text-sm">{movieInfo.runtime} min</span>
                    </div>
                  </div>
                  <ul className="list-disc flex">
                    {movieInfo.genres.map((val, i, arr) => {
                      return (
                        <li className=" first-of-type:list-none  mx-4" key={i}>
                          {val.name}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="  leading-7">{movieInfo.overview}</p>
                  <div className="flex gap-5">
                    <div
                      className=" inline-flex items-center border-2 w-fit gap-5 px-5 py-3 rounded-full border-[#f20000] cursor-pointer"
                      onClick={() => navigate("/player")}
                    >
                      <FaPlay /> <span>Watch</span>
                    </div>
                    <div
                      className=" inline-flex items-center border-2 w-fit gap-5 px-5 py-3 rounded-full border-[#f20000] cursor-pointer active:bg-[#ffffff10]"
                      onClick={() => addFavourite()}
                    >
                      <FaPlus /> <span>Add to Favourites</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
