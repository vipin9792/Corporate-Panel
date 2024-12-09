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

      // Check if the API response code is 1000 (successful login)
      if (response.data.code === 1000) {
        // If login is successful, handle the profile or any other necessary data
        const userProfile = response.data.profile;
        
        // Call onLoginSuccess with profile or any other necessary data
        onLoginSuccess(userProfile); 
        
        alert("Login successful!");

        // Ensure redirection happens after a successful login
        navigate("/Dashboard1");  // Use navigate to redirect to dashboard
      } else {
        // If the response code is not 1000, show an error message
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle error during API call
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
