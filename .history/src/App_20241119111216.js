import React, { useState } from "react";
import axios from "axios";

// API URL for signup and login
const API_BASE_URL = "http://103.35.121.219:4000/corp";

// Bearer Token (you can store it securely after login)
const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

const App = () => {
  // Signup form data
  const [signupData, setSignupData] = useState({
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  });

  // Login form data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for errors or success messages
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Handle input changes for signup
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Handle input changes for login
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, signupData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });
      if (response.data.code === 1000) {
        setMessage("Signup successful! Please log in.");
      } else {
        setError("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error.response ? error.response.data : error);
      setError(error.response ? error.response.data.message : "Signup failed!");
    }
  };

  // Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (response.data.code === 1000) {
        if (response.data.status === "Response successful complete!!") {
          // Check if the email is verified
          if (response.data.code === 1001) {
            setError("Email not verified yet, please verify first.");
            return;
          }
          const userProfile = response.data.profile;
          setUserProfile(userProfile);
          // Save token to localStorage for future use
          localStorage.setItem("token", BEARER_TOKEN);
          setIsAuthenticated(true);
          setMessage("Login successful!");
        }
      } else {
        setError("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      setError(error.response ? error.response.data.message : "Login failed!");
    }
  };

  // Fetch Protected Data (just an example)
  const fetchProtectedData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_BASE_URL}/protected-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Protected Data:", response.data);
    } catch (error) {
      console.error("Error fetching protected data:", error);
      setError("Error fetching protected data.");
    }
  };

  return (
    <div>
      <h1>Signup and Login</h1>

      {/* Signup Form */}
      <h2>Signup</h2>
      <form onSubmit={handleSignupSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={signupData.companyName}
          onChange={handleSignupChange}
          required
        />
        <input
          type="email"
          name="emailId"
          placeholder="Email ID"
          value={signupData.emailId}
          onChange={handleSignupChange}
          required
        />
        <input
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          value={signupData.phoneNo}
          onChange={handleSignupChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={signupData.address}
          onChange={handleSignupChange}
          required
        />
        <input
          type="text"
          name="userid"
          placeholder="User ID"
          value={signupData.userid}
          onChange={handleSignupChange}
          required
        />
        <input
          type="password"
          name="passwd"
          placeholder="Password"
          value={signupData.passwd}
          onChange={handleSignupChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={signupData.name}
          onChange={handleSignupChange}
          required
        />
        <button type="submit">Signup</button>
      </form>

      {/* Login Form */}
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error or success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* If logged in, show user profile and fetch protected data */}
      {isAuthenticated && userProfile && (
        <div>
          <h3>User Profile</h3>
          <p>Company Name: {userProfile.company_name}</p>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <button onClick={fetchProtectedData}>Fetch Protected Data</button>
        </div>
      )}
    </div>
  );
};

export default App;
