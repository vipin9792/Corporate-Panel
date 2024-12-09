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

    // Clear any previous error messages
    setErrorMessage("");

    const loginData = { email, password };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);
      console.log("API Response:", response); // Log the full response for debugging

      const { code, status, profile } = response.data;

      if (code === 1000) {
        // Login was successful
        // Assuming the token is in the response or you can use profile info to authenticate
        const token = response.data.token || "generated_token_here"; // Adjust this if token is elsewhere in the response

        onLoginSuccess(token); // Pass the token to the parent component or store it
        alert("Login successful!");
      } else if (code === 1001) {
        // Email is not verified
        setErrorMessage("Email not verified yet. Please verify your email first.");
      } else {
        // Handle unexpected response codes or errors
        setErrorMessage("Login failed. Please check your credentials or try again later.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        setErrorMessage(error.response.data.message || "Login failed. Please try again later.");
      } else {
        setErrorMessage("Network error. Please check your internet connection.");
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
