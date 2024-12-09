import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Directly define the BEARER_TOKEN here
  const BEARER_TOKEN =
    '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

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
