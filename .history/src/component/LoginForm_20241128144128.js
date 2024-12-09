import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCorpId } from "../CorpIdContext"; // Import the context

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(""); // Controlled state for username
  const [password, setPassword] = useState(""); // Controlled state for password
  const { setCorpId } = useCorpId(); // Get the setCorpId function from the context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { username, password }; // Use form values

    setLoading(true);
    setError("");

    // Replace with your actual Bearer Token
    const token = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Replace with the actual token value

    const headers = {
      Authorization: `Bearer ${token}`, // Set Bearer token in Authorization header
    };

    try {
      const response = await axios.post("http://103.35.121.219:4000/corp/login", credentials, { headers });

      // Check for a successful login and if the response contains the `corp_id`
      if (response.status === 200 && response.data.code === 1000) {
        const corpId = response.data.corp_id; // Assuming `corp_id` is part of the response
        if (corpId) {
          // Set the corp_id in context
          setCorpId(corpId);
          // Redirect to the Dashboard
          navigate("/Dashboard");
        } else {
          setError("No corp_id found in the response.");
        }
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
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginForm;

