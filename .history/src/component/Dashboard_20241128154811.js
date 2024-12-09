import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); // Store profile data here
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Handle errors

  // Assume authToken is passed from Login component through props or stored in state
  const [authToken, setAuthToken] = useState(''); // Token is stored in state temporarily

  useEffect(() => {
    if (!authToken) {
      // Redirect to login page if the token doesn't exist
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: 1 }, // You can replace this with dynamic user ID if available
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Use the Bearer token here
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        setError('An error occurred while fetching profile data');
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchProfileData();
  }, [authToken, navigate]); // Run effect when authToken changes

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
