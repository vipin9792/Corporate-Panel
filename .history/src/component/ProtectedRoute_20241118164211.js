import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component checks authentication
const ProtectedRoute = ({ element }) => {
  // Check if the user is authenticated (token exists in localStorage)
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/Dashboard1" />;
  }

  // If authenticated, render the passed element (protected route)
  return element;
};

export default ProtectedRoute;
