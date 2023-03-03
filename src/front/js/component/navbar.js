import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import marvelLogo from "../../img/Marvel_Logo.svg.png";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.message.text === "") return;
    if (store.message.type) {
      toast.success(store.message.text);
    } else {
      toast.error(store.message.text);
    }
  }, [store.message]);
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3">
      <div className="container ">
        <Toaster />
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="w-100 d-flex justify-content-end">
            <div className="navbar-nav gap-3">
              <Link
                className="nav-link text-white fw-bold"
                aria-current="page"
                to="/"
              >
                Favoritos
              </Link>
              <Link
                className="nav-link text-white fw-bold btn btn-danger p-2"
                to="/"
              >
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
