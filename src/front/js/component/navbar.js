import React from "react";
import marvelLogo from "../../img/Marvel_Logo.svg.png";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-dark py-3">
      <div className="container ">
        <Link to="/">
          <img src={marvelLogo} className="logo-navbar"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <span className="" role="button">
              <i
                className="fa fa-bars"
                aria-hidden="true"
                style={{ color: "white" }}
              ></i>
            </span>
          </span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="w-100 d-flex justify-content-end">
            <div className="navbar-nav ">
              <Link
                className="nav-link text-white fw-bold"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
              <Link className="nav-link text-white fw-bold" to="/">
                Features
              </Link>
              <Link className="nav-link text-white fw-bold" to="/">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
