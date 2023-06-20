import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Genres from "../components/Genres";
import CardSlider from "../components/CardSlider";
import { API_KEY,API_BASE_URL } from "../secret";
export default function Movie() {
  const [getGenre, setGenre] = useState("");

  return (
    <div className="movie">
      <Navbar />
      <Genres setGenre={setGenre} />
      <div className="text-white">
        <CardSlider
          fetchLink={`${API_BASE_URL}/3/discover/movie?language=en-US&sort_by=popularity.desc&with_genres=${getGenre}&api_key=${API_KEY}`}
          headTitle={"Popular"}
        />
        <CardSlider
          fetchLink={`${API_BASE_URL}/3/discover/movie?language=en-US&sort_by=revenue.desc&with_genres=${getGenre}&api_key=${API_KEY}`}
          headTitle={"Blockbusters"}
        />
        <CardSlider
          fetchLink={`${API_BASE_URL}/3/discover/movie?language=en-US&sort_by=vote_average.desc&with_genres=${getGenre}&api_key=${API_KEY}`}
          headTitle={"Top Rated"}
        />
      </div>
    </div>
  );
}
