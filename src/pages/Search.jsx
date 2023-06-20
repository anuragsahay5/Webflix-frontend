import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchCard from "../components/SearchCard";
import Navbar from "../components/Navbar";
import { API_BASE_URL,API_KEY } from "../secret";
export default function Search({ sval }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    maxPage: 1,
  });
  const [movieInfo, setMovieInfo] = useState([]);
  const query = searchParams.get("q");

  const loadSearch = async () => {
    setLoading(1);
    const res = await axios.get(
      `${API_BASE_URL}/3/search/movie?query=${query}&api_key=${API_KEY}&page=${pageInfo.currentPage}`
    );
    setPageInfo({
      currentPage: pageInfo.currentPage + 1,
      maxPage: res.data.total_pages,
    });

    setMovieInfo([...movieInfo, ...res.data.results]);
    setLoading(false);
  };

  useEffect(() => {
    loadSearch();
  }, [sval]);

  return (
    <>
      <Navbar showBar={true} />
      <div className="text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {movieInfo.map((val, i, arr) => {
          return <SearchCard val={val} key={i} />;
        })}

      </div>
        <div className=" text-white text-md my-5 mx-auto w-fit bg-transparent" >
          {isLoading ? (
            <p>Loading...</p>
          ) : pageInfo.currentPage > pageInfo.maxPage ? (
            "End of Results"
          ) : (
            <div className="bg-[#f20000] rounded p-2 cursor-pointer" onClick={() => loadSearch()} title="Click to view more results" > Load more Results </div>
          )}
        </div>
    </>
  );
}
