
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("corpId");
    navigate("/LoginForm"); // Redirect to login page after logout
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Logout;
