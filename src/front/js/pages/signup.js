import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/login.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sendData = async (event) => {
    event.preventDefault();
    if (name.trim() !== "" && email !== "" && password !== "") {
      const signup = await actions.signup({ name, email, password });
      if (signup) {
        actions.toggleMessage("Usuario creado correctamente", true);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      } else {
        actions.toggleMessage("No se pudo crear usurio", false);
      }
    } else {
      actions.toggleMessage("Complete todos los campos", false);
    }
  };

  useEffect(() => {
    if (store.token && store.token !== null) {
      navigate("/characters");
    }
  }, [store.token]);

  return (
    <div className="container-login">
      <div className="login text-center text-white">
        <h1>Registrate</h1>
        <form onSubmit={sendData}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <b>Nombre:</b>
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              <b>Correo:</b>
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value.trim())}
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
                onChange={(event) => setPassword(event.target.value.trim())}
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
            value="Registrarse"
          />
        </form>
      </div>
    </div>
  );
};
