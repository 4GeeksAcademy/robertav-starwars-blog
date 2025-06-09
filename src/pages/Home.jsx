import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import placeholderImage from '../assets/img/placeholder.jpg';

const BASE_URL = "https://www.swapi.tech/api/";

const getImageUrl = (type, uid) => {
  let categoryPath = '';
  switch (type) {
    case 'people': categoryPath = 'characters'; break;
    case 'vehicles': categoryPath = 'vehicles'; break;
    case 'planets': categoryPath = 'planets'; break;
    default: return '';
  }
  return `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/${categoryPath}/${uid}.jpg?raw=true`;
};

const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFavorite = store.favoritos.some(fav => fav.uid === item.uid && fav.type === type);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { uid: item.uid, type } });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: { uid: item.uid, type, name: item.name } });
    }
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100">
        <img
          src={getImageUrl(type, item.uid)}
          className="card-img-top"
          alt={item.name}
          onError={e => { e.target.onerror = null; e.target.src = placeholderImage; }}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <Link to={`/${type}/${item.uid}`} className="btn btn-purple btn-sm">
              Details
            </Link>
            <button
              onClick={handleToggleFavorite}
              className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
              aria-label={isFavorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <i className={`fa${isFavorite ? "s" : "r"} fa-heart`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchCategory = async (category) => {
        try {
          const response = await fetch(`${BASE_URL}${category}/`);
          if (!response.ok) throw new Error(`Error fetching ${category}`);
          const data = await response.json();
          return data.results;
        } catch (e) {
          console.error(e);
          return [];
        }
      };

      setCharacters(await fetchCategory("people"));
      setVehicles(await fetchCategory("vehicles"));
      setPlanets(await fetchCategory("planets"));
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-purple">Characters</h2>
      <div className="row">
        {characters.map((char) => (
          <Card key={`people-${char.uid}`} item={char} type="people" />
        ))}
      </div>

      <h2 className="mb-3 text-purple mt-5">Vehicles</h2>
      <div className="row">
        {vehicles.map((vehicle) => (
          <Card key={`vehicles-${vehicle.uid}`} item={vehicle} type="vehicles" />
        ))}
      </div>

      <h2 className="mb-3 text-purple mt-5">Planets</h2>
      <div className="row">
        {planets.map((planet) => (
          <Card key={`planets-${planet.uid}`} item={planet} type="planets" />
        ))}
      </div>
    </div>
  );
};