import React, { createContext, useReducer, useEffect } from "react";

const StarWarsContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { 
        ...state, 
        [action.payload.type]: action.payload.data 
      };

    case "TOGGLE_FAVORITE":
      const { id, name, type } = action.payload;
      const isFavorite = state.favorites.some((fav) => fav.id === id && fav.type === type);

      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((fav) => !(fav.id === id && fav.type === type))
          : [...state.favorites, { id, name, type }],
      };

    default:
      return state;
  }
};

export const StarWarsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { people: [], planets: [], vehicles: [], favorites: [] });

  useEffect(() => {
    const fetchData = async (type) => {
      try {
        const response = await fetch(`https://swapi.tech/api/${type}/`);
        if (!response.ok) throw new Error(`Failed to fetch ${type}`);
        const data = await response.json();
        dispatch({ type: "SET_DATA", payload: { type, data: data.results } });
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      }
    };

    ["people", "planets", "vehicles"].forEach((type) => fetchData(type));
  }, []);

  return <StarWarsContext.Provider value={{ state, dispatch }}>{children}</StarWarsContext.Provider>;
};

export const useStarWarsContext = () => React.useContext(StarWarsContext);