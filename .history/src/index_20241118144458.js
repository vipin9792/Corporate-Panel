// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the App component
import { BrowserRouter as Router } from "react-router-dom"; // Import Router for routing

// Get the root element where React will render the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap the entire application in BrowserRouter
root.render(
  <Router>
    <App />
  </Router>
);
