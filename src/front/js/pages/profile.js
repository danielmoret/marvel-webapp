import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, [store.token]);

  const sendData = async (event) => {
    event.preventDefault();

    const updateUser = await actions.updateUser({
      name,
      email,
      new_password,
      password,
    });
    if (updateUser) {
      actions.toggleMessage("Perfil actualizado", true);
    } else {
      actions.toggleMessage("No se pudo actualizar el perfil usurio", false);
    }
  };

  return (
    <div className="container-login d-flex flex-column">
      <div>
        <h2>Hola {store.name}</h2>
      </div>

      <div className="login text-center text-white">
        <h1>Actualizar perfil</h1>
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
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password1">
              <b>Nueva Contraseña:</b>
            </label>
            <div className="input-group input-group-md ">
              <input
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                id="password1"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={new_password}
                onChange={(event) => setNewPassword(event.target.value.trim())}
              />
              <span
                className="input-group-text"
                id="inputGroup-sizing-sm"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? (
                  <i className="fa-regular fa-eye "></i>
                ) : (
                  <i className="fa-regular fa-eye-slash "></i>
                )}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password2">
              <b>Contraseña anterior:</b>
            </label>
            <div className="input-group input-group-md ">
              <input
                type={showPassword2 ? "text" : "password"}
                className="form-control"
                id="password2"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                value={password}
                onChange={(event) => setPassword(event.target.value.trim())}
                required
              />
              <span
                className="input-group-text"
                id="inputGroup-sizing-sm"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
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
            value="Actualizar"
          />
        </form>
      </div>
    </div>
  );
};
