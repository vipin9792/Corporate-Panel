import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch profile data
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Retrieve the token from localStorage or other storage
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setError('Token is missing, please log in again.');
        navigate('/login');
        return;
      }

      // Making a POST request to fetch profile data
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
        {
          corp_id: 1, // Replace this with dynamic corp_id if necessary
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from localStorage
          },
        }
      );

      // Check for valid response
      if (response.data.code === 1000) {
        setProfileData(response.data.profile);
      } else {
        setError(`Error: ${response.data.status}`);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching profile data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfileData();
  }, []); // Empty dependency array to run only once after the component mounts

  // Loading, error, and data handling
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Render the profile data
  return (
    <div className="profile-dashboard">
      <h1>Profile Dashboard</h1>
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
