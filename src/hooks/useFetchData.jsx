import { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalStore";

const API_BASE = "https://www.swapi.tech/api";

export const useFetchData = () => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Helper to fetch one category and extract results
        const fetchCategory = async (category) => {
          const res = await fetch(`${API_BASE}/${category}`);
          const json = await res.json();
          return json.results || [];
        };

        const [people, planets, vehicles] = await Promise.all([
          fetchCategory("people"),
          fetchCategory("planets"),
          fetchCategory("vehicles"),
        ]);

        dispatch({ type: "SET_DATA", payload: { people, planets, vehicles } });
      } catch (e) {
        console.error("Failed to fetch SWAPI data", e);
      }
    };

    if (state.people.length === 0) {
      fetchAll();
    }
  }, [dispatch, state.people.length]);
};
