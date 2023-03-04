import React, { useEffect, useState, useContext } from "react";

import { Context } from "../store/appContext";

import "../../styles/characters.css";
import { CardCharacter } from "../component/cardCharacter";

export const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.favorites.lentgth > 0) return;
    actions.getFavorites();
  }, []);

  return (
    <>
      <div className="container py-3">
        <div className="row">
          {store.characters.map((character) => (
            <CardCharacter character={character} key={character.id} />
          ))}
        </div>
      </div>
    </>
  );
};
