import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ProfileDashboard component
const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure the Authorization token is correctly included
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {}, {
          headers: {
            'Authorization': 'Bearer 
            // 'x-api-key': '<API_KEY>',
          },
        });

        console.log('API Response:', response.data); // Log the response to check what you get back
        setProfileData(response.data); // Set the profile data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err);
        setError(err.response ? err.response.data.status : 'Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading, error, and data handling
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>; // Display the error message (like "Keys does not match !!")
  }

  // Render the profile data
  return (
    <div className="profile-dashboard">
      <h1>Profile Dashboard</h1>

      {/* Render Profile if data exists */}
      {profileData && profileData.name && (
        <div className="profile-card">
          <div className="profile-header">
            <h2>{profileData.name}</h2>
            <p>{profileData.role}</p>
          </div>
          <div className="profile-body">
            <div className="profile-info">
              <strong>Email:</strong> <span>{profileData.email}</span>
            </div>
            <div className="profile-info">
              <strong>Phone:</strong> <span>{profileData.phone}</span>
            </div>
            <div className="profile-info">
              <strong>Location:</strong> <span>{profileData.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
