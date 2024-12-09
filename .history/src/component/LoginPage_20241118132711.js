import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Get navigate function from useNavigate hook
  const navigate = useNavigate();

  // Handle email input change
  const handleEmailChange = (e) => setEmailId(e.target.value);

  // Handle password input change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission (Login request)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear any previous error messages
    setErrorMessage("");

    // Create the payload for login API request
    const loginData = { emailId, password };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);
      console.log(response);

      // Assuming response contains the Bearer token in the 'token' field
      const token = response.data.token;

      if (token) {
        // On successful login, pass the token back to the parent component or store it
        onLoginSuccess(token);  // Handle token saving here

        // Redirect to dashboard after successful login
        navigate("/Dashboard1");  // This line redirects to the dashboard
        alert("Login successful!");
      } else {
        // If the token is not returned, show an error
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle error during API call
      console.error("Login error:", error.response || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="emailId">Email:</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={emailId}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
