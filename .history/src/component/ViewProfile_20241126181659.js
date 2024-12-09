import React, { useState } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [corpId, setCorpId] = useState(null); // New state for corp_id
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCorpId = async () => {
    try {
      const response = await axios.get('http://103.35.121.219:4000/corp/dashboard/getCorpId', {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Replace with the actual token
        },
      });
      if (response.data.code === 1000) {
        setCorpId(response.data.corp_id); // Set the corp_id
        fetchProfileData(response.data.corp_id); // Fetch profile data using corp_id
      } else {
        setError('Error fetching company ID.');
      }
    } catch (err) {
      setError('Error fetching company ID.');
      console.error('Error fetching company ID:', err);
    }
  };

  const fetchProfileData = async (corpId) => {
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
        { corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Replace with the actual token
          },
        }
      );
      if (response.data.code === 1000) {
        setProfileData(response.data.profile); // Set profile data
      } else {
        setError('Error fetching profile data.');
      }
    } catch (err) {
      setError('Error fetching profile data');
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>View Profile</h2>
      <button onClick={fetchCorpId}>Fetch Corp ID</button>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div>
        {/* Display profile data */}
        {profileData ? (
          <>
            <p>Corporate Name: {profileData.company_name}</p>
            {/* More profile fields here */}
          </>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
