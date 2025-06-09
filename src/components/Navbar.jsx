import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../context/GlobalStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showFavs, setShowFavs] = useState(false);
  const favRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (favRef.current && !favRef.current.contains(e.target)) {
        setShowFavs(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleTheme = () => dispatch({ type: "TOGGLE_THEME" });

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        state.theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } sticky-top shadow`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Star Wars
        </Link>

        <button
          className="btn btn-outline-secondary me-2"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {state.theme === "dark" ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>

        <div className="position-relative" ref={favRef}>
          <button
            className="btn btn-outline-warning position-relative"
            onClick={() => setShowFavs((v) => !v)}
          >
            <i className="fas fa-heart"></i>
            {state.favorites.length > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">
                {state.favorites.length}
              </span>
            )}
          </button>

          {showFavs && (
            <ul
              className={`list-group position-absolute end-0 mt-2 shadow`}
              style={{ minWidth: "250px", zIndex: 1000 }}
            >
              {state.favorites.length === 0 && (
                <li className="list-group-item">No favorites added.</li>
              )}
              {state.favorites.map(({ name, uid, category }) => (
                <li
                  key={`${uid}-${category}`}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <Link
                    to={`/details/${category}/${uid}`}
                    className="flex-grow-1 text-decoration-none"
                    onClick={() => setShowFavs(false)}
                  >
                    {name}
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FAVORITE", payload: { uid, category } })
                    }
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
