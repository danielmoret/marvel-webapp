import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import marvelLogo from "../../img/Marvel_Logo.svg.png";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [mode, setMode] = useState(false);
  useEffect(() => {
    if (store.message.text === "") return;
    if (store.message.type) {
      toast.success(store.message.text);
    } else {
      toast.error(store.message.text);
    }
  }, [store.message]);

  const toggleTheme = () => {
    if (store.theme == "dark") {
      actions.handleTheme("");
    } else {
      actions.handleTheme("dark");
    }
  };
  return (
    <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark py-3">
      <div className="container ">
        <Toaster />
        <Link to="/">
          <img src={marvelLogo} className="logo-navbar"></img>
        </Link>
        {store.token && (
          <>
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
                <div className="navbar-nav gap-3 align-items-baseline">
                  <Link
                    className="nav-link text-white fw-bold"
                    aria-current="page"
                    to="/characters"
                  >
                    <i className="fa-solid fa-house"></i>
                  </Link>
                  <Link
                    className="nav-link text-white fw-bold"
                    aria-current="page"
                    to="/favorites"
                  >
                    Favoritos
                  </Link>
                  <Link
                    className="nav-link text-white fw-bold"
                    aria-current="page"
                    to="/profile"
                  >
                    Perfil
                  </Link>
                  <button
                    className={
                      store.theme == "dark" ? "switch active" : "switch"
                    }
                    onClick={toggleTheme}
                  >
                    <span>
                      {store.theme == "dark" ? (
                        <i className="fa-solid fa-sun text-black"></i>
                      ) : (
                        <i className="fa-solid fa-moon text-white"></i>
                      )}
                    </span>
                  </button>
                  <button
                    className="nav-link text-white fw-bold btn btn-danger p-2"
                    onClick={() => actions.logout()}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
