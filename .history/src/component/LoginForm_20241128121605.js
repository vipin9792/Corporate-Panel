import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCorpId } from "../CorpIdContext";  // Import the context

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCorpId } = useCorpId();  // Get the setCorpId function from the context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username: "user", password: "password" }; // Replace with actual form values

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://103.35.121.219:4000/login", credentials);

      if (response.status === 200 && response.data.code === 1000) {
        // Assuming response contains corp_id
        setCorpId(response.data.corp_id); // Set corp_id in context
        navigate("/dashboard"); // Redirect to the Dashboard after login
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginForm;
