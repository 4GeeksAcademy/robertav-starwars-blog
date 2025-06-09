import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Vehicles = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <div className="container">
      <h2>Vehicles</h2>
      <div className="row">
        {state.vehicles.map((vehicle) => (
          <div className="col-md-4" key={vehicle.uid}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`} />
              <Card.Body>
                <Card.Title>{vehicle.name}</Card.Title>
                <Button as={Link} to={`/details/vehicles/${vehicle.uid}`} variant="info">
                  View Details
                </Button>
                <Button
                  variant="primary"
                  onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: { id: vehicle.uid, name: vehicle.name, type: "vehicles" } })}
                >
                  {state.favorites.some((fav) => fav.id === vehicle.uid && fav.type === "vehicles") 
                    ? `Remove ${vehicle.name} from Favorites` 
                    : `Add ${vehicle.name} to Favorites`}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;