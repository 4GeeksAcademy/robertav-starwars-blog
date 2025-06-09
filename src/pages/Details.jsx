import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { category, uid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fix category for images: people → characters
  const imageCategory = category === "people" ? "characters" : category;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.swapi.tech/api/${category}/${uid}`);
        const json = await res.json();
        if (json.result && json.result.properties) {
          setData(json.result.properties);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [category, uid]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (!data) return <div className="container mt-4">Not found.</div>;

  return (
    <div className="container mt-4">
      <h2>{data.name}</h2>
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://starwars-visualguide.com/assets/img/${imageCategory}/${uid}.jpg`}
            alt={data.name}
            className="img-fluid rounded"
            onError={(e) =>
              (e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
            }
          />
        </div>
        <div className="col-md-8">
          <table className="table table-bordered table-striped">
            <tbody>
              {Object.entries(data).map(([key, val]) => (
                <tr key={key}>
                  <th>{key.replace(/_/g, " ").toUpperCase()}</th>
                  <td>{val.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Details;
