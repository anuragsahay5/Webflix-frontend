import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { SERVER_BASE_URL } from "../secret";
export default function Login() {
  const navigate = useNavigate();
  const elem = useRef();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    try {
      const res = await axios.post(`${SERVER_BASE_URL}/api/login`, formData);

      setformData({
        email: "",
        password: "",
      });

      localStorage.setItem("userId", res.data.userid);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    setformData({
      ...formData,
      password: "",
    });
  }

  return (
    <div
      className="login-page flex flex-col justify-center items-center"
      ref={elem}
    >
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        draggable
        theme="dark"
      />
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="netflix-logo"
          className="h-10 absolute top-0 left-0 mx-20 my-5"
        />
      </Link>
      <div className="login w-96 bg-[#000000a9] space-y-12 py-20 px-10 rounded">
        <p className="text-white font-semibold text-3xl">Sign In</p>
        <form
          className="flex flex-col justify-center"
          onSubmit={(e) => handleLogin(e)}
        >
          <input
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            required
            type="text"
            name="email"
            id="email"
            placeholder="Username"
            className="text-white py-3 px-4 outline-none bg-[#333] rounded focus:bg-[#484848] my-3"
          />
          <input
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            required
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            className=" text-white py-3 px-4 outline-none bg-[#333] rounded focus:bg-[#484848] my-3"
          />
          <button
            type="submit"
            className=" bg-[#e50914] text-white py-3 rounded my-6 font-bold"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-500">
          New to Netflix?{" "}
          <Link to={"/signup"} className="text-white font-medium">
            Sign up now.
          </Link>
        </p>
      </div>
    </div>
  );
}
