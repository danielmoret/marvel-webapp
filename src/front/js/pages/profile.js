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

  const handleUser = async () => {
    if (password !== "") {
      const deleteAllFavorite = await actions.deleteAllFavorite(password);
      if (deleteAllFavorite) {
        actions.deleteUser();
      } else {
        actions.toggleMessage("Credenciales invalidas", false);
      }
    } else {
      actions.toggleMessage("No ingreso su contraseña");
    }
  };

  const sendData = async (event) => {
    event.preventDefault();
    if (password !== "") {
      const updateUser = await actions.updateUser({
        name,
        email,
        new_password,
        password,
      });
      if (updateUser) {
        actions.toggleMessage("Perfil actualizado", true);
        setName("");
        setEmail("");
        setNewPassword("");
        setPassword("");
      } else {
        actions.toggleMessage("Contraseña inválida", false);
      }
    } else {
      actions.toggleMessage("No ingreso su contraseña", false);
    }
  };

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, [store.token]);

  return (
    <div className={`w-100 py-3 ${store.theme}`}>
      <div className="container-login d-flex flex-column">
        <div className="py-2">
          <h2 className={store.theme == "dark" && "text-white"}>
            Hola {store.name}
          </h2>
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
                  onChange={(event) =>
                    setNewPassword(event.target.value.trim())
                  }
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
                <b>Contraseña actual:</b>
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
          <button className="btn btn-light mt-3" onClick={handleUser}>
            <b>Eliminar Cuenta</b> <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
