import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalStore";
import CardItem from "../components/CardItem";

const Home = () => {
  const { state } = useContext(GlobalContext);

  if (state.people.length === 0) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>Star Wars Catalog</h1>

      {/* People */}
      <section className="mb-5">
        <h2>People</h2>
        <div className="d-flex flex-wrap gap-3">
          {state.people.map((person) => (
            <CardItem key={person.uid} item={person} category="characters" />
          ))}
        </div>
      </section>

      {/* Planets */}
      <section className="mb-5">
        <h2>Planets</h2>
        <div className="d-flex flex-wrap gap-3">
          {state.planets.map((planet) => (
            <CardItem key={planet.uid} item={planet} category="planets" />
          ))}
        </div>
      </section>

      {/* Vehicles */}
      <section className="mb-5">
        <h2>Vehicles</h2>
        <div className="d-flex flex-wrap gap-3">
          {state.vehicles.map((vehicle) => (
            <CardItem key={vehicle.uid} item={vehicle} category="vehicles" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
