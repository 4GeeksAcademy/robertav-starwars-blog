import React from "react";
import { useStarWarsContext } from "../context/StarWarsContext";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const People = () => {
  const { state, dispatch } = useStarWarsContext();

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center text-warning">Star Wars Characters</h2>
      <div className="row">
        {state.people.length === 0 ? (
          <p className="text-center text-muted">Loading characters...</p>
        ) : (
          state.people.map((person) => (
            <div className="col-md-4 mb-4" key={person.uid}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
                  alt={person.name}
                  onError={(e) => {
                    e.target.onerror = null; // prevents infinite loop
                    e.target.src =
                      "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
                  }}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{person.name}</Card.Title>
                  <div className="mt-auto">
                    <Button
                      as={Link}
                      to={`/details/people/${person.uid}`}
                      variant="info"
                      className="me-2"
                    >
                      View Details
                    </Button>
                    <Button
                      variant={
                        state.favorites.some(
                          (fav) => fav.id === person.uid && fav.type === "people"
                        )
                          ? "danger"
                          : "primary"
                      }
                      onClick={() =>
                        dispatch({
                          type: "TOGGLE_FAVORITE",
                          payload: { id: person.uid, name: person.name, type: "people" },
                        })
                      }
                    >
                      {state.favorites.some(
                        (fav) => fav.id === person.uid && fav.type === "people"
                      )
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default People;
