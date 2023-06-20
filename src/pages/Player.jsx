import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
export default function Player() {
  const navigate = useNavigate();
  return (
    <div className="player h-[100vh]">
      <div
        className="text-white text-4xl m-3 p-1 w-fit opacity-30 rounded-full hover:opacity-100 active:bg-[#f8f8f826] transition-opacity duration-300 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft />
      </div>
      <video
        src="/trailer.mp4"
        controls
        autoPlay
        muted
        loop
        className=" bg-cover w-full h-full"
      ></video>
    </div>
  );
}
