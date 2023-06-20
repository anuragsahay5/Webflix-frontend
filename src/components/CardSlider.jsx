import React, { memo, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { Carousel } from "antd";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
function CardSlider({ fetchLink, headTitle }) {
  const [numofcard, setnumofcard] = useState();
  const elem = useRef();
  const [mInfo, setInfo] = useState([]);

  async function loadInfo() {
    let res = await axios.get(fetchLink);
    setInfo(
      res.data.results.map((val, i, arr) => {
        return {
          movieId: val.id,
          backdrop: val.backdrop_path,
          title: val.title,
          rating: val.vote_average,
          liked: false,
        };
      })
    );
  }

  useEffect(() => {
    loadInfo();
    if (window.innerWidth <= 640) {
      setnumofcard(1);
    } else if (window.innerWidth <= 960) {
      setnumofcard(2);
    } else {
      setnumofcard(3);
    }
  }, [fetchLink]);

  return (
    <div className="card-slider my-10">
      <div className="mx-1 my-5 flex items-center text-2xl">
        <FaBookmark className=" text-[#f20000]" />
        <div className="text-white ml-5 font-bold">{headTitle}</div>
      </div>
      <Carousel
        slidesToShow={numofcard}
        slidesToScroll={1}
        ref={elem}
        dots={false}
      >
        {mInfo.map((val, i, arr) => {
          return <Card val={val} key={i} />;
        })}
      </Carousel>
      <div className="carousel-control flex justify-center">
        <div
          className="p-2 cursor-pointer bg-[#F20000] m-3 w-fit text-center rounded hover:bg-black transition-all duration-300 "
          onClick={() => elem.current.prev()}
        >
          <AiFillCaretLeft className="text-lg" />
        </div>
        <div
          className="p-2 cursor-pointer bg-[#F20000] m-3 w-fit text-center rounded hover:bg-black transition-all duration-300 "
          onClick={() => elem.current.next()}
        >
          <AiFillCaretRight className="text-lg" />
        </div>
      </div>
    </div>
  );
}

export default memo(CardSlider);
