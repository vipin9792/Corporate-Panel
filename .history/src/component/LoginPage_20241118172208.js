import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

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
    setErrorMessage(""); // Clear any previous error messages
    setLoading(true); // Set loading state to true

    const loginData = { email, password };

    // Create Axios instance with timeout configuration
    const axiosInstance = axios.create({
      timeout: 10000, // 10 seconds timeout
    });

    try {
      const response = await axiosInstance.post("http://103.35.121.219:4000/corp/login", loginData);
      console.log("API Response:", response);

      const { code, status, profile } = response.data;
      if (code === 1000) {
        onLoginSuccess(response.data.token);
        alert("Login successful!");
      } else if (code === 1001) {
        setErrorMessage("Email not verified yet. Please verify your email first.");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed. Please try again later.");
      } else if (error.request) {
        setErrorMessage("Server not reachable. Please check your network.");
      } else {
        setErrorMessage("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false); // Reset loading state
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
