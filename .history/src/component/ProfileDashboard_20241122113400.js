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
        // Making a POST request to fetch profile data
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          corp_id: 1, // Passing the corp_id as per your API structure
        }, {
          headers: {
            'Authorization': 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });

        console.log('API Response:', response.data); // Log the response data
        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set the profile data if response is successful
        } else {
          setError('Error: ' + response.data.status); // Set error if the response status is not successful
        }
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
