import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve corp_id from localStorage (always called, even if not found)
  const corp_id = localStorage.getItem('corp_id');

  useEffect(() => {
    // If corp_id is not found, set error and return early
    if (!corp_id) {
      setError("Error: No corporation ID found. Please log in first.");
      setLoading(false);
      return; // Early return from useEffect
    }

    const fetchData = async () => {
      try {
        // Making a POST request to fetch profile data with dynamic corp_id
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corp_id }, // Passing the dynamic corp_id
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, // Assuming the token is stored in localStorage as well
            },
          }
        );

        console.log('API Response:', response.data); // Log the response data

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set the profile data if response is successful
        } else {
          setError('Error: ' + response.data.status); // Set error if the response status is not successful
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err);

        if (err.response && err.response.data.status === 'Token Mismatch or Broken. Relogin to get access.') {
          setError('Session expired or invalid token. Please log in again.');
          // You could trigger a logout or redirect to a login page here
        } else {
          setError(err.response ? err.response.data.status : 'Error fetching data');
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [corp_id]); // useEffect depends on corp_id

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
            <img
              src={profileData.logo}
              alt="Company Logo"
              className="profile-logo"
            />
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
