// SignIn.js

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

      console.log("Login API response:", response); // Debugging

      // Check if the response is successful and contains profile data
      const { code, status, profile } = response.data;

      if (code === 1000 && profile) {
        // If the profile data is returned, store it in localStorage (or sessionStorage)
        localStorage.setItem("userProfile", JSON.stringify(profile));

        // Pass profile or user details to the parent component or handle further actions
        onLoginSuccess(profile);
        alert("Login successful!");

        // Optionally, fetch other data if necessary
        // fetchProfile();
      } else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
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
