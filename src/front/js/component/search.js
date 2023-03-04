import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/search.css";

export const Search = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container py-3">
      <div className="row ">
        <input
          type="text"
          placeholder="Busca tu personaje favorito"
          value={store.searchValue}
          className="input-search"
          onChange={(event) => {
            actions.changeSearchValue(event.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};
