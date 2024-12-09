import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();  // Initialize navigate hook for redirecting

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

      const { code, status, profile } = response.data;

      if (code === 1000 && profile) {
        // Save the profile data (for example, in localStorage or context)
        localStorage.setItem("userProfile", JSON.stringify(profile));

        // Pass profile data to parent component or handle further actions
        onLoginSuccess(profile);

        // Redirect to the dashboard page
        navigate("/dashboard");  // Redirect to dashboard

        alert("Login successful!");
      } else {
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error Details:", error);
      if (error.response) {
        console.error("API Error Response:", error.response.data);
        setErrorMessage(error.response?.data?.message || "Login failed. Please try again later.");
      } else if (error.request) {
        console.error("API No Response:", error.request);
        setErrorMessage("No response from server. Please check your internet connection.");
      } else {
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
