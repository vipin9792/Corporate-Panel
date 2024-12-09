import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token
  const corpId = localStorage.getItem('corp_id'); // Get corp_id from localStorage

  useEffect(() => {
    if (!corpId) {
      setError('No company ID found. Please log in again.');
      return;
    }

    // Fetch profile data from the API
    const fetchProfileData = async () => {
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
        }
      } catch (err) {
        setError('Error fetching profile data');
        console.error('Error:', err);
      }
    };

    fetchProfileData();
  }, [corpId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>View Profile</h4>
      <div>
        <p><strong>Company Name:</strong> {profileData.company_name}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Phone:</strong> {profileData.phone_no}</p>
        <p><strong>Address:</strong> {profileData.address}</p>
        <p><strong>Username:</strong> {profileData.username}</p>
        {/* Optionally, display logo */}
        <img src={profileData.logo} alt="Company Logo" style={{ width: '100px', height: '100px' }} />
      </div>
      <Link to="/editProfile1">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
};

export default ViewProfile;
