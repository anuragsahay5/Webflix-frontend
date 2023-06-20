import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Webflix from "./pages/Webflix";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Player from "./pages/Player";
import Movie from "./pages/Movie";
import Favourite from "./pages/Favourite";
import MovieDetails from "./pages/MovieDetails.jsx";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import CardSlider from "./components/CardSlider";
import { memo } from "react";
import Search from "./pages/Search";
import axios from "axios";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute
              elem1={<Webflix />}
              elem2={<Navigate to={"/signup"} />}
            />
          }
        />
        <Route
          path="/login"
          exact
          element={
            <ProtectedRoute elem1={<Navigate to={"/"} />} elem2={<Login />} />
          }
        />
        <Route
          path="/signup"
          exact
          element={
            <ProtectedRoute elem1={<Navigate to={"/"} />} elem2={<Signup />} />
          }
        />
        <Route
          path="/player"
          exact
          element={
            <ProtectedRoute
              elem1={<Player />}
              elem2={<Navigate to={"/signup"} />}
            />
          }
        />
        <Route
          path="/movies"
          exact
          element={
            <ProtectedRoute
              elem1={<Movie />}
              elem2={<Navigate to={"/signup"} />}
            />
          }
        />
        <Route
          path="/favourite"
          exact
          element={
            <ProtectedRoute
              elem1={<Favourite />}
              elem2={<Navigate to={"/signup"} />}
            />
          }
        />

        <Route
          path="/movies/:id"
          exact
          element={
            <ProtectedRoute
              elem1={<MovieDetails wo={2} />}
              elem2={<Navigate to={"/signup"} />}
            />
          }
        />

        <Route
          path="/search"
          exact
          element={
            <ProtectedRoute
              elem1={<Search />}
              elem2={<Navigate to={"/signup"} />}
            />
          }
        />

        <Route path="/cardslider" element={<CardSlider />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function ProtectedRoute({ elem1, elem2 }) {
  const userid = localStorage.getItem("userId");
  if (!userid) {
    return elem2;
  }
  return elem1;
}

export default memo(App);
