import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardCharacter } from "../component/cardCharacter";
import "../../styles/characters.css";

export const Favorite = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getFavorites();
  }, []);
  return (
    <>
      <div className="container py-3">
        <div className="row">
          {store.favorites.map((favorite) => (
            <CardCharacter character={favorite} key={favorite.id} />
          ))}
        </div>
      </div>
    </>
  );
};
