import React, { createContext, useReducer, useEffect } from "react";

const initialState = {
  people: [],
  planets: [],
  vehicles: [],
  favorites: [],
  theme: "light",
};

export const GlobalContext = createContext(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, ...action.payload };
    case "ADD_FAVORITE":
      if (
        state.favorites.find(
          (f) => f.uid === action.payload.uid && f.category === action.payload.category
        )
      ) return state; // avoid duplicates
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (f) => !(f.uid === action.payload.uid && f.category === action.payload.category)
        ),
      };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Optionally load data from localStorage to persist favorites and theme
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    const storedTheme = localStorage.getItem("theme");
    if (storedFavorites) dispatch({ type: "SET_DATA", payload: { favorites: storedFavorites } });
    if (storedTheme) dispatch({ type: "SET_DATA", payload: { theme: storedTheme } });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
    localStorage.setItem("theme", state.theme);
  }, [state.favorites, state.theme]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
