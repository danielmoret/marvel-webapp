import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardCharacter = ({ character }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3">
      <div className="card mt-4 card-character">
        <img
          src={
            character.thumbnail
              ? `${character.thumbnail.path}.${character.thumbnail.extension}`
              : `${character.img}`
          }
          className="card-img-top"
          alt={character.name}
        />
        <div className="card-body">
          <h5 className="card-title text-center">
            <b>{character.name}</b>
          </h5>
          <div className="btn-card d-flex justify-content-around align-items-center">
            <Link
              className={
                store.theme !== "dark"
                  ? "btn btn-outline-dark"
                  : "btn btn-outline-light"
              }
              to={
                character?.character_id
                  ? `/character/${character?.character_id}`
                  : `/character/${character.id}`
              }
            >
              Detalle
            </Link>
            <button
              className="btn btn-outline-warning"
              onClick={() => actions.updateFavorite(character)}
            >
              {store.favorites.some(
                (fav) => fav.character_id === character.character_id
              ) ||
              store.favorites.some(
                (fav) => fav.character_id === character.id
              ) ? (
                <i className="fa-solid fa-star btn-start"></i>
              ) : (
                <i className="fa-regular fa-star btn-start"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
