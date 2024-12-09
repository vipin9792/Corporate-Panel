import React, { useState } from "react";
import SignupForm from "./component/SignupForm";
import LoginForm from "./component/LoginForm";
import Profile from "./component/Profile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  return (
    <div>
      <h1>Signup and Login</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* If not authenticated, show Signup and Login forms */}
      {!isAuthenticated ? (
        <div>
          <SignupForm setMessage={setMessage} setError={setError} />
          <hr />
          <LoginForm
            setIsAuthenticated={setIsAuthenticated}
            setUserProfile={setUserProfile}
            setMessage={setMessage}
            setError={setError}
          />
        </div>
      ) : (
        // Show user profile if authenticated
        <Profile userProfile={userProfile} />
      )}
    </div>
  );
};

export default App;
