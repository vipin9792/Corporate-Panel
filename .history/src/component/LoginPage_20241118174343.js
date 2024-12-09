import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage(""); // Reset error message

    const loginData = {
      email,
      password,
    };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);
      console.log("API Response:", response); // Log response for debugging

      // Extract necessary fields from the response
      const { code, status, profile } = response.data;

      if (code === 1000 && profile) {
        // If the profile data is returned, store it in localStorage (or sessionStorage)
        localStorage.setItem("userProfile", JSON.stringify(profile));

        // Pass profile or user details to the parent component or handle further actions
        onLoginSuccess(profile);
        alert("Login successful!");
      } else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error Details:", error); // Log full error details
      if (error.response) {
        // Server responded with a non-2xx status code
        console.error("API Error Response:", error.response.data);
        setErrorMessage(error.response?.data?.message || "Login failed. Please try again later.");
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("API No Response:", error.request);
        setErrorMessage("No response from server. Please check your internet connection.");
      } else {
        // Something else happened in setting up the request
        console.error("General Error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
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

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
