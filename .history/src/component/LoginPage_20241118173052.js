import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Static Bearer Token (for use after login)
  const bearerToken = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

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
    e.preventDefault();
    setErrorMessage(""); // Clear any previous errors
    setLoading(true); // Set loading state to true

    const loginData = { email, password };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);

      console.log("Full API Response:", response); // Log the full response object
      console.log("Response Data:", response.data); // Log the actual data

      // Check if the response contains the expected fields
      const { code, status, profile } = response.data;

      if (code === 1000) {
        // On successful login, store the token in localStorage
        alert("Login successful!");

        // Store the Bearer token in localStorage
        localStorage.setItem("authToken", bearerToken);  // Store the token

        // Pass the token to the parent component (if needed)
        onLoginSuccess(bearerToken);

        // You can also trigger a fetchProfile function to get user profile data after login (optional)
        // fetchProfile();
      } else if (code === 1001) {
        setErrorMessage("Email not verified yet. Please verify your email first.");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error); // Detailed error logging

      if (error.response) {
        // If the server responded with an error
        setErrorMessage(error.response.data.message || "Login failed. Please try again later.");
      } else if (error.request) {
        // No response from the server
        setErrorMessage("Server not reachable. Please check your network.");
      } else {
        // Other errors
        setErrorMessage("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  // Function to fetch the user's profile using the stored token
  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("http://103.35.121.219:4000/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
        },
      });

      console.log("Profile data:", response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setErrorMessage("Failed to fetch profile. Please try again later.");
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
