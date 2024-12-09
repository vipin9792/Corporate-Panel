import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle email input change
  const handleEmailChange = (e) => setEmailId(e.target.value);

  // Handle password input change
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission (Login request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    const loginData = { emailId, password };

    try {
      // Send POST request to the login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);

      // Assuming the response contains the Bearer token in the 'token' field
      const token = response.data.token;

      if (token) {
        // Store the token (e.g., in localStorage)
        localStorage.setItem("authToken", token);
        onLoginSuccess(token); // Pass token back to parent component

        // Redirect to the dashboard
        navigate("/dashboard");
        alert("Login successful!");
      } else {
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
          <label htmlFor="emailId">Email:</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={emailId}
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
