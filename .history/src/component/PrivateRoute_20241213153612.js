// PrivateRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/LoginForm" replace />
      )}
    />
  );
};

export default PrivateRoute;
