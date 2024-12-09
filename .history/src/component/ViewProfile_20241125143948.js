import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const ProfileComponent = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Access the location object from react-router
  const location = useLocation();

  // Parse the query string to get the corpId
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get("corpId");  // Get corp_id from the URL query

  useEffect(() => {
    if (!corpId) {
      setError("corp_id is missing in the URL");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
          {
            params: { corp_id: corpId },
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

    fetchProfile();
  }, [corpId]);  // Make sure to refetch if corpId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
