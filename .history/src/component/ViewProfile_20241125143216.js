import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ProfileComponent = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the query parameters from the URL
  const query = new URLSearchParams(useLocation().search);
  const corpIdFromUrl = query.get("corpId");

  useEffect(() => {
    if (!corpIdFromUrl) {
      setError("corp_id is missing in the URL.");
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
          {
            params: { corp_id: corpIdFromUrl },
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

export default ViewProfile;
