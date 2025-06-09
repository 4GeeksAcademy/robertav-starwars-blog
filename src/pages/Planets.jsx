import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Planets = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <div className="container">
      <h2>Planets</h2>
      <div className="row">
        {state.planets.map((planet) => (
          <div className="col-md-4" key={planet.uid}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} />
              <Card.Body>
                <Card.Title>{planet.name}</Card.Title>
                <Button as={Link} to={`/details/planets/${planet.uid}`} variant="info">
                  View Details
                </Button>
                <Button
                  variant="primary"
                  onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: { id: planet.uid, name: planet.name, type: "planets" } })}
                >
                  {state.favorites.some((fav) => fav.id === planet.uid && fav.type === "planets") 
                    ? `Remove ${planet.name} from Favorites` 
                    : `Add ${planet.name} to Favorites`}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;