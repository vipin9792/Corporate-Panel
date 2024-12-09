import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BEARER_TOKEN } from './config'; // Import the token from the config file

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const corpId = queryParams.get('corpId');
    console.log("corpId:", corpId); // Check the value of corpId
    
    if (corpId) {
      fetchProfile(corpId);
    } else {
      setError("Corp ID is missing in URL.");
      setLoading(false);
    }
  }, [location]);

  const fetchProfile = async (corpId) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
        { corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`, // Use the imported token
          },
        }
      );
      
      console.log("Profile API Response:", response); // Log the response

      if (response.status === 200 && response.data.profile) {
        setProfile(response.data.profile);
      } else {
        setError("Profile fetch failed.");
      }
    } catch (error) {
      console.log("Error fetching profile:", error); // Log any error
      setError("An error occurred while fetching the profile.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading profile...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : profile ? (
        <div>
          <h3>{profile.company_name}</h3>
          <p>{profile.phone_no}</p>
          <p>{profile.address}</p>
          <img src={profile.logo} alt="Company Logo" />
          {/* Display other profile details */}
        </div>
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  );
};

export default ViewProfile;
