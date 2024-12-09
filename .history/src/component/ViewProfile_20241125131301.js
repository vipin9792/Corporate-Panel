import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Define BEARER_TOKEN (replace with your actual token)
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN';  // Replace with your actual token

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get the corp_id from the URL query parameter
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corp_id = queryParams.get("corpId"); // Retrieve the corp_id from URL

  useEffect(() => {
    if (!corp_id) {
      setError("No company ID found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://103.35.121.219:4000/corp/profile/${corp_id}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError("Failed to fetch profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [corp_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h1>Profile Information</h1>
      {profileData ? (
        <div>
          <p><strong>Company Name:</strong> {profileData.companyName}</p>
          <p><strong>Email:</strong> {profileData.emailId}</p>
          <p><strong>Phone Number:</strong> {profileData.phoneNo}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>User ID:</strong> {profileData.userid}</p>
          <p><strong>Full Name:</strong> {profileData.name}</p>
        </div>
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  );
};

export default ViewProfile;
