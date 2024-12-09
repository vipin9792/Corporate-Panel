// components/LoginPage.js
import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission (login request)
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
      console.log(response);

      // Assuming the response contains the Bearer token in the 'token' field
      const token = response.data.token;

      if (token) {
        // On successful login, pass the token to the parent component
        onLoginSuccess(token);
        alert("Login successful!");
      } else {
        // If no token is returned, show an error message
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
          <label htmlFor="email">Email:</label>
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

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
