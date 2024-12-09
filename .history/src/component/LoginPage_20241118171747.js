import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

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
    setErrorMessage(""); // Clear any previous error messages
    setLoading(true); // Set loading state to true

    const loginData = {
      email,
      password,
    };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);
      console.log("API Response:", response); // Log the full response for debugging

      const { code, status, profile } = response.data;
      console.log("Code:", code, "Status:", status, "Profile:", profile); // Log the extracted data

      if (code === 1000) {
        // Login was successful
        const token = response.data.token || "generated_token_here"; // Adjust if token is elsewhere in the response
        onLoginSuccess(token); // Pass the token to the parent component or store it
        alert("Login successful!");
      } else if (code === 1001) {
        // Email is not verified
        setErrorMessage("Email not verified yet. Please verify your email first.");
      } else {
        // Handle unexpected code
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // Error response from the server
        console.error("Error response data:", error.response.data);
        setErrorMessage(error.response.data.message || "Login failed. Please try again later.");
      } else if (error.request) {
        // No response received from the server
        console.error("No response received:", error.request);
        setErrorMessage("Server not reachable. Please check your network or try again later.");
      } else {
        // Other errors (configuration, setup, etc.)
        console.error("Error message:", error.message);
        setErrorMessage("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false); // Reset loading state after request is complete
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
