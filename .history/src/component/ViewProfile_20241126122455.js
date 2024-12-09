import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const corpId = queryParams.get('corpId');
    
    if (corpId) {
      fetchProfile(corpId);
    }
  }, [location]);

  const fetchProfile = async (corpId) => {
    try {
      const response = await axios.post(
        `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
        { corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.profile) {
        setProfile(response.data.profile);
      } else {
        setError("Profile fetch failed.");
      }
    } catch (error) {
      setError("An error occurred while fetching the profile.");
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {profile ? (
        <div>
          <h3>{profile.company_name}</h3>
          <p>{profile.phone_no}</p>
          <p>{profile.address}</p>
          {/* Display other profile details */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ViewProfile;
