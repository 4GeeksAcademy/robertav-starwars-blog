import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalStore";

const CardItem = ({ item, category }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const isFavorite = state.favorites.some(
    (f) => f.uid === item.uid && f.category === category
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { uid: item.uid, category } });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: { ...item, category } });
    }
  };

  const imageUrl = `https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`;

  return (
    <div className="card" style={{ width: "15rem" }}>
      <img
        src={imageUrl}
        className="card-img-top"
        alt={item.name}
        onError={(e) => (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">
          {/* Show some short description */}
          UID: {item.uid}
        </p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link
            to={`/details/${category}/${item.uid}`}
            className="btn btn-primary btn-sm"
          >
            Details
          </Link>
          <button
            className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
            onClick={toggleFavorite}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
