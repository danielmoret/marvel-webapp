import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import marvelBanner from "../../img/banner.jpg";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <div
        className="card text-bg-dark border-0"
        style={{
          backgroundImage: `url(
          "https://i.pinimg.com/originals/4f/4d/da/4f4ddacf4ac20f9c6af4444779ed40e0.jpg"
        )`,
        }}
      ></div>
      <div className="card-img-overlay d-flex justify-content-center align-items-center mt-5">
        <div className="d-flex flex-column gap-5 align-items-center">
          <div>
            <h1 className="title">Universo Marvel</h1>
          </div>
          <div className="d-flex justify-content-center gap-2">
            <Link to="/login">
              <button className="btn btn-dark btn-lg">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-dark btn-lg">Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
