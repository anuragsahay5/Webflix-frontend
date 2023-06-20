import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { SERVER_BASE_URL } from "../secret";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  async function handleRegister(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    try {
      const res = await axios.post(`${SERVER_BASE_URL}/api/register`, formData);
      localStorage.setItem("userId", res.data.userid);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    setformData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="signup-page">
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        draggable
        theme="dark"
      />
      <Header />
      <div className="main-frame text-center flex flex-col items-center justify-center pt-[30vh]">
        <p className="text-white text-4xl font-bold mb-2">
          Unlimited movies, TV shows and more
        </p>
        <p className="text-white text-xl my-2">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="text-white text-xl my-2">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form onSubmit={(e) => handleRegister(e)}>
          <input
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            type="text"
            name="email"
            id="email"
            required
            className="mx-0.5 my-3 outline-none py-4 px-2 w-[20rem] bg-[#00000081] border rounded text-white focus:bg-[#00000091]"
            placeholder="Enter Username"
          />
          <input
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            type="password"
            name="password"
            id="password"
            required
            className="mx-0.5 my-3 outline-none py-4 px-2 w-[20rem] bg-[#00000081] border rounded text-white focus:bg-[#00000091]"
            placeholder="Password"
          />
          <button className="text-white bg-[#e50914] py-2 px-5 font-semibold text-2xl block m-auto rounded-[3px] active:bg-[#e50914cd]">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}
