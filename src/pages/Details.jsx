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
        setData(result.result);
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
  if (!data) return <p>No data available</p>;

  const properties = data.properties;
  const imageUrl = `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;

  return (
    <div className="container mt-4 text-light">
      <Card>
        <Card.Img
          variant="top"
          src={imageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
          }}
        />
        <Card.Body>
          <Card.Title>{properties.name || "Unnamed"}</Card.Title>
          <Card.Text>
            <ul>
              {Object.entries(properties).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace("_", " ")}:</strong> {value}
                </li>
              ))}
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Details;
