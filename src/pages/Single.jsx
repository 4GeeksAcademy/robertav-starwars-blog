import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

export const Single = () => {
  const { type, uid } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}${type}/${uid}`);
        if (!response.ok) {
          throw new Error(`Error fetching details: ${response.statusText}`);
        }
        const data = await response.json();
        setDetails(data.result.properties);
      } catch (err) {
        console.error("Failed to fetch details:", err);
        setError("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };

    if (type && uid) {
      fetchDetails();
    }
  }, [type, uid]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-warning">Loading details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5 alert alert-danger">
        <p>{error}</p>
        <Link to="/">
          <button className="btn btn-primary mt-3">Back to Home</button>
        </Link>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="container text-center mt-5">
        <p>No details found for this item.</p>
        <Link to="/">
          <button className="btn btn-primary mt-3">Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row bg-dark text-light p-4 rounded shadow-lg">
        <div className="col-md-5">
          <img
            src={getImageUrl(type, uid)}
            className="img-fluid rounded"
            alt={details.name}
            onError={e => { e.target.onerror = null; e.target.src = placeholderImage; }}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="text-warning mb-3">{details.name}</h2>
          <p className="lead text-secondary">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
          <hr className="border-secondary" />

          <div className="details-grid">
            {Object.entries(details).map(([key, value]) =>
              key !== "url" &&
              key !== "created" &&
              key !== "edited" &&
              key !== "uid" &&
              key !== "homeworld" &&
              typeof value !== "object" &&
              value !== "n/a" &&
              value !== "unknown" ? (
                <div className="detail-item mb-2" key={key}>
                  <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
                </div>
              ) : null
            )}
          </div>

          <Link to="/">
            <button className="btn btn-primary mt-4">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
