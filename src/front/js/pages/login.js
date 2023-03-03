import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import toast, { Toaster } from "react-hot-toast";

import "../../styles/login.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendData = async (event) => {
    event.preventDefault();
    const login = await actions.login(email, password);
    if (login) {
      actions.toggleMessage("Logueado correctamente", true);
      navigate("/characters");
    } else {
      actions.toggleMessage("Credenciales inválidas", false);
    }
  };

  return (
    <div className="container-login">
      <Toaster />
      <div className="login text-center text-white">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <b>Email:</b>
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              <b>Contraseña:</b>
            </label>
            <div className="input-group input-group-md ">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <span
                className="input-group-text"
                id="inputGroup-sizing-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye "></i>
                ) : (
                  <i className="fa-regular fa-eye-slash "></i>
                )}
              </span>
            </div>
          </div>
          <input
            className="btn btn-danger w-100 btn-ingresar"
            type="submit"
            value="Ingresar"
          />
        </form>
      </div>
    </div>
  );
};
