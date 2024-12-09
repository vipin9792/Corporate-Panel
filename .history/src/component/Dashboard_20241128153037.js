import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ userId }) => {
  const [profileData, setProfileData] = useState(null); // Store profile data here
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Handle errors

  useEffect(() => {
    if (userId) {
      // Fetch profile data from the API
      const fetchProfileData = async () => {
        try {
          const response = await axios.post(
            'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
            {
              corp_id: userId, // Pass the userId as corp_id to the API
            },
            {
              headers: {
                Authorization: `!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Replace with your actual token if needed
              },
            }
          );

          if (response.data.code === 1000) {
            setProfileData(response.data.profile); // Set profile data to state
          } else {
            setError('Failed to fetch profile data');
          }
        } catch (err) {
          setError('An error occurred while fetching profile data');
        } finally {
          setLoading(false); // Stop loading when the data is fetched
        }
      };

      fetchProfileData();
    }
  }, [userId]); // Re-run the effect when userId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      {profileData && (
        <div className="profile-card">
          <div className="profile-header">
            <img src={profileData.logo} alt="Company Logo" />
            <h2>{profileData.company_name}</h2>
          </div>
          <div className="profile-details">
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Username:</strong> {profileData.username}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Phone No:</strong> {profileData.phone_no}</p>
            <p><strong>Address:</strong> {profileData.address}</p>
            <p><strong>Storage Used:</strong> {profileData.storage_used} MB</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
