import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); // Store profile data here
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Handle errors

  useEffect(() => {
    // Retrieve the token and userId from localStorage
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      // Redirect to login if no token or userId exists
      navigate('/login');
      return;
    }

    // Fetch profile data from the API using the Bearer token
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the Bearer token here
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
  }, [navigate]); // Run effect on mount

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
