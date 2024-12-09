import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const ProfileComponent = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the query parameters from the URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const corpIdFromUrl = query.get("corpId");

  useEffect(() => {
    // If corpId is not available in the URL, show an error
    if (!corpIdFromUrl) {
      setError("corp_id is missing in the URL.");
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
          {
            params: { corp_id: corpIdFromUrl },  // Pass the corp_id in the params
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data.profile);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (err) {
        setError("Error fetching profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpIdFromUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {profileData ? (
        <div>
          <h3>{profileData.company_name}</h3>
          <p>{profileData.name}</p>
          <p>{profileData.email}</p>
          <p>{profileData.phone_no}</p>
          <p>{profileData.address}</p>
          <img src={profileData.logo} alt="Company Logo" />
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default ProfileComponent;
