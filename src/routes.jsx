import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/details/:category/:uid" element={<Details />} />
    <Route path="*" element={<div className="container mt-4">Page Not Found</div>} />
  </Routes>
);

export default RoutesComponent;
