const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: JSON.parse(localStorage.getItem("characters")) || [],
      token: localStorage.getItem("token") || null,
      name: localStorage.getItem("name") || "",
      apiUrl: "https://gateway.marvel.com/v1/public",
      endPoints: ["characters"],
      options: ["comics"],
      favorites: JSON.parse(localStorage.getItem("favorites")) || [],
      message: { text: "", type: false },
      searchValue: "",
      theme: localStorage.getItem("theme") || "",
    },

    actions: {
      syncToken: async () => {
        const store = getStore();
        const actions = getActions();
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/token/refresh`,
            {
              headers: {
                Authorization: `Bearer ${store.token}`,
              },
            }
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error);
          }

          const data = await response.json();
          localStorage.setItem("token", data.token);
          setStore({ token: data.token });
        } catch (error) {
          console.error(error);
          actions.logout();
          return false;
        }
      },

      toggleMessage: (text, type) => {
        setStore({ message: { text: text, type: type } });
      },

      handleTheme: (theme) => {
        setStore({ theme: theme });
        localStorage.setItem("theme", theme);
      },

      signup: async (data) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/user`, opts);
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user/login`,
            opts
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);
          setStore({ token: data.token });
          setStore({ name: data.name });
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      getUserData: async () => {
        const store = getStore();
        const actions = getActions();

        const sync = await actions.syncToken();
        const opts = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/user`, opts);
          const data = await response.json();
          setStore({ name: data.name });
          localStorage.setItem("name", data.name);
        } catch (error) {}
      },

      updateUser: async (data) => {
        const store = getStore();
        const actions = getActions();

        const sync = await actions.syncToken();

        data.name = data.name.trim() || null;
        data.email = data.email || null;
        data.new_password = data.new_password || null;
        data.password = data.password || null;

        const opts = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(data),
        };
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/user`, opts);
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();

          actions.getUserData();
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      deleteUser: async () => {
        const store = getStore();
        const actions = getActions();

        const resp = await actions.deleteAllFavorite();

        if (resp) {
          const opts = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
          };
          try {
            const response = await fetch(
              `${process.env.BACKEND_URL}/user`,
              opts
            );
            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message);
            }
            actions.toggleMessage("Usuario eliminado", true);
            actions.logout();
          } catch (error) {
            console.error(error);
            actions.toggleMessage("No se pudo eliminar usuario", false);
            return false;
          }
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null });
      },

      getCharacters: async () => {
        const store = getStore();
        if (localStorage.characters == undefined) {
          try {
            const response = await fetch(
              `${store.apiUrl}/characters?ts=${process.env.API_TS}&apikey=${process.env.API_KEY}&hash=${process.env.API_HASH}`
            );
            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message);
            }
            const body = await response.json();
            console.log(body.data.results);
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

      getFavorites: async () => {
        const store = getStore();
        const actions = getActions();

        const sync = await actions.syncToken();
        const opts = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/favorite`,
            opts
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          setStore({ favorites: data });
          localStorage.setItem("favorites", JSON.stringify(store.favorites));
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      updateFavorite: (item) => {
        const store = getStore();
        const actions = getActions();

        const favorite =
          store.favorites.some((fav) => fav.character_id === item.id) ||
          store.favorites.some((fav) => fav.character_id === item.character_id);

        if (favorite) {
          actions.deleteFavorite(item);
        } else {
          actions.addFavorite(item);
        }
      },

      addFavorite: async (item) => {
        const store = getStore();
        const actions = getActions();

        const sync = await actions.syncToken();

        const data = {
          name: item.name,
          img: `${item?.thumbnail?.path}.${item?.thumbnail?.extension}`,
        };

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify(data),
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/favorite/${item.id}`,
            opts
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          actions.toggleMessage("Añadido a favoritos", true);
          actions.getFavorites();
          return true;
        } catch (error) {
          console.error(error);
          actions.toggleMessage("No se pudo añadir a favoritos", false);
          return false;
        }
      },

      chekcUser: async (password) => {
        const store = getStore();
        const actions = getActions();
        const sync = await actions.syncToken();

        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
          body: JSON.stringify({
            password: password,
          }),
        };

        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/user/check`,
            opts
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          const data = await response.json();
          console.log(data);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      deleteAllFavorite: async () => {
        const store = getStore();
        const actions = getActions();

        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/favorite`,
            opts
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      deleteFavorite: async (item) => {
        const itemID = item.character_id || item.id;
        const store = getStore();
        const actions = getActions();

        const sync = await actions.syncToken();
        const opts = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
          },
        };
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/favorite/${itemID}`,
            opts
          );
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          actions.toggleMessage("Eliminado de favoritos", true);
          actions.getFavorites();
          return true;
        } catch (error) {
          console.error(error);
          actions.toggleMessage("No se pudo eliminar de favoritos", false);
          return false;
        }
      },

      changeSearchValue: (value) => {
        setStore({ searchValue: value });
      },
    },
  };
};

export default getState;
