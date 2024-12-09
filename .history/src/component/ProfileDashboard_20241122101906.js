import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ProfileDashboard component
const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to navigate to another page

  // Fetching data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('auth_token'); // Fetch token from localStorage

      // If token is not present, redirect to login page
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Making a POST request to fetch profile data
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          {
            corp_id: localStorage.getItem('corp_id'), // Use corp_id from localStorage if available
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        console.log('API Response:', response.data); // Log the response data

        // Handling success response
        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set the profile data if response is successful
        } else {
          setError('Error: ' + response.data.status); // Set error if the response status is not successful
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err);
        // Check if error is due to invalid or expired token
        if (err.response && err.response.data.status === 'APP Token Mismatch or Broken.') {
          setError('Session expired or invalid token. Please log in again.');
          navigate('/login'); // Redirect to login page on token mismatch
        } else {
          setError(err.response ? err.response.data.status : 'Error fetching data');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]); // 'navigate' dependency to ensure the hook is correctly triggered

  // Loading, error, and data handling
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message if there's an issue
  }

  // Render the profile data
  return (
    <div className="profile-dashboard">
      <h1>Profile Dashboard</h1>

      {/* Render Profile if data exists */}
      {profileData && (
        <div className="profile-card">
          <div className="profile-header">
            <img src={profileData.logo} alt="Company Logo" className="profile-logo" />
            <h2>{profileData.name}</h2>
            <p>{profileData.username}</p>
          </div>
          <div className="profile-body">
            <div className="profile-info">
              <strong>Company Name:</strong> <span>{profileData.company_name}</span>
            </div>
            <div className="profile-info">
              <strong>Email:</strong> <span>{profileData.email}</span>
            </div>
            <div className="profile-info">
              <strong>Phone:</strong> <span>{profileData.phone_no}</span>
            </div>
            <div className="profile-info">
              <strong>Address:</strong> <span>{profileData.address}</span>
            </div>
            <div className="profile-info">
              <strong>Storage Used:</strong> <span>{profileData.storage_used} MB</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
