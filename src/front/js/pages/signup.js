import React, { useContext, useState, useEffect } from "react";

import "../../styles/login.css";

export const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-login">
      <div className="login text-center text-white">
        <h1>Registrate</h1>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <b>Name:</b>
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
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
                class="form-control"
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
            value="Registrarse"
          />
        </form>
      </div>
    </div>
  );
};
