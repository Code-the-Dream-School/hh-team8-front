import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = JSON.parse(localStorage.getItem("auth"));
  return token ? <Outlet /> : <Navigate to="/Home" replace />;
};

export default PrivateRoute;
