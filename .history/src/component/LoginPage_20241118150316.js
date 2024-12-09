import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To store error message
  const navigate = useNavigate();  // Initialize the navigate function

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission (Login request)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear any previous error messages
    setErrorMessage("");

    // Create the payload for login API request
    const loginData = {
      email,
      password,
    };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);
      console.log(response);  // Log the response data for debugging purposes

      // Assuming response contains the Bearer token in the 'token' field
      const token = response.data.token;

      if (token) {
        // On successful login, pass the token back to the parent component or store it
        onLoginSuccess(token);
        alert("Login successful!");

        // Redirect to the dashboard page after successful login
        navigate("/Dashboard1");  // Use navigate to redirect
      } else {
        // If the token is not returned, show an error
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle error during API call

      // Check if error has response data (for specific error message)
      if (error.response) {
        // If API returned a message, show it
        setErrorMessage(error.response.data.message || "Failed to login. Please check your credentials.");
      } else if (error.request) {
        // If no response was received
        setErrorMessage("No response from server. Please try again later.");
      } else {
        // If an error occurred while setting up the request
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      console.error("Login error:", error.response || error.message);
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
            id="email"
            name="email"
            value={email}
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

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default LoginPage;
