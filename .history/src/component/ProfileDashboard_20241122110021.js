import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileDashboard = () => {
  const { token, corpId } = useParams(); // Get token and corpId from the URL

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
';  // Use the token from the URL directly

  // Fetch profile data when the component mounts
  useEffect(() => {
    if (!token || !corpId) {
      setError('Invalid or expired token/corpId.');
      alert('Token or corpId is missing or invalid!');
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },  // Pass corp_id in the request body
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,  // Use the token from the URL
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);  // Set profile data if successful
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
  }, [token, corpId, BEARER_TOKEN]); // Only run when token or corpId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile Dashboard</h1>
      {profileData ? (
        <div>
          <div>
            <img
              src={profileData.logo}
              alt="Company Logo"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
          <h2>{profileData.company_name}</h2>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.phone_no}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Storage Used:</strong> {profileData.storage_used} MB</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default ProfileDashboard;
