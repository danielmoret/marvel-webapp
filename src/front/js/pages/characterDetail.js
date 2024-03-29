import { element } from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Accordion } from "../component/accordion";
import { Context } from "../store/appContext";
import "../../styles/cardDetail.css";

export const CharacterDetail = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [character, setCharacter] = useState([]);

  const findCharacter = () => {
    const characterFind = store.characters.find(
      (character) => character.id == params.id
    );
    setCharacter(characterFind);
  };

  useEffect(() => {
    findCharacter();
  }, []);

  return (
    <div className={`w-100 ${store.theme} `}>
      <div
        className="container py-3 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card card-detail mb-3" style={{ width: "100%" }}>
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                className="img-fluid"
                alt={character?.name}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <div className="d-flex justify-content-between p-2">
                  <h5 className="card-title h2">{character?.name}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => actions.updateFavorite(character)}
                  >
                    {store.favorites.some(
                      (fav) => fav.character_id == params.id
                    ) ? (
                      <i className="fa-solid fa-star btn-start"></i>
                    ) : (
                      <i className="fa-regular fa-star btn-start"></i>
                    )}
                  </button>
                </div>

                <p className="card-text">{character?.description}</p>
                <div className="card-text">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <>
                      <Accordion
                        title={"Comics"}
                        type={"comics"}
                        body={character}
                        id={1}
                      />
                      <Accordion
                        title={"Eventos"}
                        type={"events"}
                        body={character}
                        id={2}
                      />
                      <Accordion
                        title={"Series de Historietas"}
                        type={"series"}
                        body={character}
                        id={3}
                      />
                      <Accordion
                        title={"Historietas"}
                        type={"stories"}
                        body={character}
                        id={4}
                      />
                    </>
                  </div>
                </div>
                <div className="d-flex justify-content-center p-2">
                  <Link
                    className={
                      store.theme !== "dark"
                        ? "btn btn-outline-dark"
                        : "btn btn-outline-light"
                    }
                    to={`/characters`}
                  >
                    Volver
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
