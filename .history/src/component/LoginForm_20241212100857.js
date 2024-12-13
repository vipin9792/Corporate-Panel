import React from "react";
import LoginForm from "./LoginForm";

const handleLogin = (userId) => {
  console.log("User logged in with ID:", userId);
  // Add logic to handle login, such as updating state or redirecting
};

const App = () => {
  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default App;
