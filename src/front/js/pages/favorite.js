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
          {store.favorites.length > 0 ? (
            store.favorites.map((favorite) => (
              <CardCharacter character={favorite} key={favorite.id} />
            ))
          ) : (
            <div className="col-6 col-sm-6 col-md-4 col-lg-3 w-100">
              <div className="text-center">
                <h2 className={store.theme !== "" && "text-white"}>
                  Sin favoritos
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
