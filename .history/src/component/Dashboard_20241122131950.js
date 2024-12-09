import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BEARER_TOKEN } from "../config";  // Correct path to config.js

const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const corpId = localStorage.getItem("corp_id");  // Getting corp_id from localStorage

      if (!corpId) {
        navigate("/login");  // If no corp_id, redirect to login page
        return;
      }

      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/dashboard/${corpId}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`, // Using the token from config
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (error) {
        setError("Error fetching profile data.");
      }
    };

    fetchProfileData();
  }, [navigate]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {profileData ? (
        <div>
          <h1>Welcome to the Dashboard</h1>
          <p>Company Name: {profileData.companyName}</p>
          <p>Email: {profileData.emailId}</p>
          <p>Phone Number: {profileData.phoneNo}</p>
        </div>
      ) : (
        <div>Loading profile data...</div>
      )}
    </div>
  );
};

export default Dashboard;
