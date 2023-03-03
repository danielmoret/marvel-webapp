import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/characters.css";
import { CardCharacter } from "../component/cardCharacter";

export const Characters = () => {
  const { store, actions } = useContext(Context);

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
