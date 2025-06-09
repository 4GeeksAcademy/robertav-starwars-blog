import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState } from "react";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRemoveFavorite = (uid, type) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
  };

  return (
    <nav className="navbar navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">STAR WARS</span>
        </Link>

        <div className="dropdown ms-auto" style={{ position: "relative" }}>
          <button
            className="btn btn-purple position-relative dropdown-toggle"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            Favorites
            <span className="badge bg-secondary ms-2">{store.favoritos.length}</span>
          </button>

          <ul
            className={`dropdown-menu dropdown-menu-end${dropdownOpen ? " show" : ""}`}
            style={{ minWidth: "250px", maxHeight: "350px", overflowY: "auto" }}
            aria-labelledby="favoritesDropdown"
          >
            {store.favoritos.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites added</li>
            ) : (
              store.favoritos.map((fav) => (
                <li
                  key={fav.uid + fav.type}
                  className="d-flex justify-content-between align-items-center px-3"
                >
                  <Link
                    to={`/${fav.type}/${fav.uid}`}
                    className="dropdown-item flex-grow-1"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {fav.name}
                  </Link>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleRemoveFavorite(fav.uid, fav.type)}
                    aria-label={`Remove ${fav.name} from favorites`}
                  >
                    &times;
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};