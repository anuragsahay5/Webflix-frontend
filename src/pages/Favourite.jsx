import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import FavCard from "../components/FavCard";
import { SERVER_BASE_URL } from "../secret";
export default function Favourite() {
  const [favList, setFavList] = useState([]);
  const [isRemoved, setRemoved] = useState(1);

  const fetchList = async () => {
    const res = await axios.get(
      `${SERVER_BASE_URL}/api/favourite?id=${localStorage.getItem("userId")}`
    );
    setFavList(res.data);
  };

  useEffect(() => {
    fetchList();
  }, [isRemoved]);

  return (
    <div className="favourite min-h-screen">
      <Navbar showBar={true} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {favList.length > 0 ? (
          favList.map((val, i) => {
            return <FavCard val={val} key={i} setRemoved={setRemoved} />;
          })
        ) : (
          <p className="text-center text-white text-xl mt-10 w-[100vw]">
            Your Favourites list is Empty!
          </p>
        )}
      </div>
    </div>
  );
}
