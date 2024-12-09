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
        const response = await axios.get('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          headers: {
            'Authorization': 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
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
    return <div className="error">{error}</div>;
  }

  // Check if profileData is available and display the profile card
  return (
    <div className="profile-dashboard">
      <h1>Profile Dashboard</h1>
      
      {/* Render Profile if data exists */}
      {profileData && (
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

