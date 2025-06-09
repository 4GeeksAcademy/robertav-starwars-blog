import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Star Wars Explorer</span>
        </Link>
        <div className="ml-auto d-flex align-items-center">
          {/* Favorites Dropdown */}
          <NavDropdown title="Favorites" id="favorites-dropdown">
            {state.favorites.length > 0 ? (
              state.favorites.map((fav) => (
                <NavDropdown.Item key={fav.id} href={`/details/${fav.type}/${fav.id}`}>
                  {fav.type.toUpperCase()} - {fav.id}
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: { id: fav.id, type: fav.type } })}
                  >
                    ❌
                  </button>
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item>No Favorites Yet</NavDropdown.Item>
            )}
          </NavDropdown>

          {/* Context Demo Button */}
          <Link to="/demo">
            <button className="btn btn-primary ms-3">Check Context in Action</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;