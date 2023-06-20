import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL } from "../secret";
export default function FavCard({ val, setRemoved }) {
  const navigate = useNavigate();
  const removeFav = async () => {
    try {
      const res = await axios.get(
        `${SERVER_BASE_URL}/api/removeFavourite?id=${localStorage.getItem(
          "userId"
        )}&objId=${val._id}`
      );
      setRemoved((prev) => 1 - prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white relative inline-block border p-1 m-1 rounded hover:opacity-80 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/original${val.backdrop}`}
        alt=""
        className="z-0 opacity-70"
      />
      <div
        className="cursor-pointer rounded text-xl absolute top-[10px] right-[10px] p-1 bg-[#f20000] active:bg-[#f20000c0] "
        title="Remove from List"
        onClick={() => removeFav()}
      >
        <FaPlus className="font-bold rotate-45 " />
      </div>
      <div className=" absolute bottom-0 left-0 right-0 text-center sm:text-md md:text-xl font-semibold p-1 mx-1 bg-[#000000a0]">
        {val.title}
      </div>
    </div>
  );
}
