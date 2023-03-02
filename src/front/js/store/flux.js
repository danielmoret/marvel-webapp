const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: JSON.parse(localStorage.getItem("characters")) || [],
      apiUrl: "http://gateway.marvel.com/v1/public",
    },
    actions: {
      getCharacters: async () => {
        const store = getStore();
        if (localStorage.characters == undefined) {
          try {
            const response = await fetch(
              `${store.apiUrl}/characters?ts=${process.env.API_TS}&apikey=${process.env.API_KEY}&hash=${process.env.API_HASH}`
            );
            if (!response.ok) {
              const error = response.json();
              throw new Error(error.message);
            }
            const body = await response.json();
            setStore({ characters: body.data.results });
            localStorage.setItem(
              "characters",
              JSON.stringify(store.characters)
            );
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        }
      },
    },
  };
};

export default getState;
