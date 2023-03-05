import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/characters.css";
import { CardCharacter } from "../component/cardCharacter";
import { Search } from "../component/search";

export const Characters = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [searchCharacters, setSearchCharacters] = useState([]);

  useEffect(() => {
    if (store.favorites.lentgth > 0) return;
    actions.getFavorites();
  }, []);

  useEffect(() => {
    const search = store.characters.filter((character) =>
      character.name
        .toLowerCase()
        .includes(store.searchValue.trim().toLowerCase())
    );
    setSearchCharacters(search);
  }, [store.searchValue]);

  useEffect(() => {
    if (!store.token) navigate("/login");
  }, [store.token]);

  return (
    <>
      <div className={`w-100 ${store.theme}`}>
        <div className={`container py-3 min-vh-100`}>
          <Search />
          <div className="row">
            {searchCharacters.map((character) => (
              <CardCharacter character={character} key={character.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
