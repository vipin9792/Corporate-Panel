import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
  const location = useLocation();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  useEffect(() => {
    const corpId = location.state?.corp_id; // Get corp_id from React Router state

    if (!corpId) {
      setError('No company ID found. Please log in again.');
      alert('No company ID found. Please log in again.');
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError('Error fetching profile data.');
          alert('Error fetching profile data.');
        }
      } catch (err) {
        setError('Error fetching profile data');
        alert('Error fetching profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [location.state]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Profile Details</h2>
      <div>
        {profileData ? (
          <div>
            <p>{profileData.details}</p>
            {/* Render other profile data */}
          </div>
        ) : (
          <p>No profile data available</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
