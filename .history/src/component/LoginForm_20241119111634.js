import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ setIsAuthenticated, setUserProfile, setMessage, setError }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/login",
        loginData,
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        if (response.data.status === "Email not verified yet, please verify first.") {
          setError("Email not verified yet, please verify first.");
          return;
        }

        const userProfile = response.data.profile;
        localStorage.setItem("token", "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz");
        setUserProfile(userProfile);
        setIsAuthenticated(true);
        setMessage("Login successful!");
      } else {
        setError("Login failed! Please check your credentials.");
      }
    } catch (error) {
      setError("Login failed! Please try again.");
    }
  };

  return (
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
  );
};

export default LoginForm;
