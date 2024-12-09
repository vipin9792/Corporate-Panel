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

      // If login is successful, store the token and call the onLoginSuccess callback
      const token = response.data.token;

      if (token) {
        // Store token in localStorage (or sessionStorage)
        localStorage.setItem("authToken", token);

        // Pass token to parent component or handle further actions
        onLoginSuccess(token);
        alert("Login successful!");

        // Optionally, fetch the profile
        fetchProfile(token);
      } else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.response || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again later.");
    }
  };

  // Fetch the user's profile after login
  const fetchProfile = async (token) => {
    if (!token) {
      setErrorMessage("No token found. Please login again.");
      return;
    }

    try {
      const response = await axios.get("http://103.35.121.219:4000/corp/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token in the Authorization header
        },
      });

      console.log("Profile data:", response.data); // Log the profile data
    } catch (error) {
      console.error("Profile fetch error:", error);
      setErrorMessage("Failed to fetch profile. Please try again.");
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