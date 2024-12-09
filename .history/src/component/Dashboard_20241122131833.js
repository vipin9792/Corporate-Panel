// src/component/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BEARER_TOKEN } from "../config"; // Import BEARER_TOKEN

const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if corp_id exists in localStorage
    const corpId = localStorage.getItem('corp_id');
    
    if (!corpId) {
      // If no corp_id, redirect to login/signup page
      navigate("/LoginForm");
    } else {
      // Fetch the dashboard/profile data
      fetchProfileData(corpId);
    }
  }, [navigate]);

  const fetchProfileData = async (corpId) => {
    try {
      const response = await axios.get(
        `http://103.35.121.219:4000/corp/dashboard/${corpId}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        setProfileData(response.data);
      } else {
        setError("Failed to load dashboard data.");
      }
    } catch (error) {
      setError("An error occurred while fetching profile data.");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {profileData ? (
        <div>
          <h2>Welcome, {profileData.companyName}</h2>
          <p>{profileData.email}</p>
          {/* Render other profile data */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
