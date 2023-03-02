import React from "react";
import { Link } from "react-router-dom";

export const CardCharacter = ({ character }) => {
  return (
    <div className="col-6 col-sm-6 col-md-4 col-lg-3">
      <div className="card mt-4 card-character">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          className="card-img-top"
          alt={character.name}
        />
        <div className="card-body">
          <h5 className="card-title text-center">
            <b>{character.name}</b>
          </h5>
          <div className="btn-card d-flex justify-content-around align-items-center">
            <Link className="btn btn-outline-dark" to="/">
              Detalle
            </Link>
            <button className="btn btn-outline-warning">
              <i className="fa-regular fa-star btn-start"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
