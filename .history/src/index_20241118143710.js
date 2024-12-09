// index.js
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Import your App component
import { BrowserRouter as Router } from "react-router-dom";  // Import Router from react-router-dom

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>  {/* Wrap the entire app in BrowserRouter */}
    <App />
  </Router>
);
