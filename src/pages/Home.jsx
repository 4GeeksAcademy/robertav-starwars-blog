import React from "react";
import People from "../pages/People";
import Planets from "../pages/Planets";
import Vehicles from "../pages/Vehicles";

export const Home = () => {
  return (
    <div className="container">
      <h1>Star Wars Universe</h1>
      <People />
      <Planets />
      <Vehicles />
    </div>
  );
};

export default Home;