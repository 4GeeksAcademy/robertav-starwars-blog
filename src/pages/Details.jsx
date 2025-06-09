import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Details = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://swapi.tech/api/${type}/${id}/`);
        if (!response.ok) throw new Error(`Failed to fetch ${type} details`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      {data ? (
        <Card>
          <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`} />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              <strong>Details:</strong> {JSON.stringify(data, null, 2)}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Details;