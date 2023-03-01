import React, { useEffect, useState } from "react";

export const Characters = () => {
  const [charactersData, setCharactersData] = useState({});
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    const API_KEY = "2e054878261f3b85a7a63c8f0b7ba8af";
    const API_HASH = "c37b581714ab8a048c17b82c860f9483";
    const API_TS = "1";
    const API_URL = "http://gateway.marvel.com/v1/public";
    try {
      const response = await fetch(
        `${API_URL}/characters?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`
      );
      if (!response.ok) {
        const error = response.json();
        throw new Error(error.message);
      }
      const body = await response.json();
      setCharactersData(body);
      setCharacters(body.data.results);
      console.log(body.data.results);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {characters.map((character) => (
          <div className="col-3" key={character.id}>
            <div className="card mt-4">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
