import React, { memo, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BrandCard from "../components/BrandCard";
import CardSlider from "../components/CardSlider";
import { Carousel } from "antd";
import { API_BASE_URL,API_KEY } from "../secret";
function Watchflix() {
  const [showNav, setshowNav] = useState(false);
  const movies = JSON.parse(import.meta.env.VITE_BANNER_IDS);

  window.onscroll = () => {
    setshowNav(window.scrollY == 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="Homepage">
      <Navbar showBar={showNav} />

      <Carousel
        autoplay
        className="brand mt-[-88px] relative"
        swipeToSlide={true}
        autoplaySpeed={3000}
      >
        {movies.map((val, i, arr) => {
          return <BrandCard movieId={val} key={i} />;
        })}
      </Carousel>

      <CardSlider
        fetchLink={
          `${API_BASE_URL}/3/trending/movie/day?language=en-US&api_key=${API_KEY}`
        }
        headTitle={"Trending Now"}
      />
      <CardSlider
        fetchLink={
          `${API_BASE_URL}/3/movie/now_playing?language=en-US&api_key=${API_KEY}`
        }
        headTitle={"New Releases"}
      />
      <CardSlider
        fetchLink={
          `${API_BASE_URL}/3/movie/top_rated?language=en-US&api_key=${API_KEY}`
        }
        headTitle={"Top Rated"}
      />
      <CardSlider
        fetchLink={
          `${API_BASE_URL}/3/trending/movie/week?language=en-US&api_key=${API_KEY}`
        }
        headTitle={"Popular"}
      />
    </div>
  );
}
export default memo(Watchflix);
