import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardCharacter } from "../component/cardCharacter";
import "../../styles/characters.css";

export const Favorite = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, [store.token]);

  return (
    <div className={`w-100 ${store.theme}`}>
      <div className="container py-3 min-vh-100">
        <div className="row">
          {store.favorites.map((favorite) => (
            <CardCharacter character={favorite} key={favorite.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
