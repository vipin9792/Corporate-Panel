import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Log to check if API call is made
        console.log('Making API request to fetch profile data...');
        
        // Make the API request with the Bearer token
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          headers: {
            Authorization: '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });

        // Log the response data for debugging
        console.log('API Response:', response);

        // Check for successful response
        if (response.data.code === 1000) {
          setProfileData(response.data.profile);  // Save profile data to state
        } else {
          // API response code is not 1000, log the error
          console.error('API Response Error:', response.data);
          alert('API Response Error: ' + response.data.status); // Alert user of error
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        // Log actual error in case the request fails
        console.error('API Fetch Error:', err);
        alert('Error fetching data: ' + err.message); // Show alert with error message
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run once on mount

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an issue
  if (error) {
    return (
      <div>
        {error}
        <br />
        <small>Check console for more details.</small>
      </div>
    );
  }

  // Render the profile data
  return (
    <div className="profile-dashboard container">
      <div className="card" style={{ width: '18rem', margin: '20px auto', padding: '20px', borderRadius: '10px' }}>
        {/* Profile Logo */}
        <div className="text-center">
          <img
            src={profileData?.logo || 'https://via.placeholder.com/100'} // Use a placeholder if no logo is available
            alt="Company Logo"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        
        {/* Profile Information */}
        <div className="card-body text-center">
          <h5 className="card-title">{profileData?.company_name}</h5>
          <p className="card-text"><strong>Name: </strong>{profileData?.name}</p>
          <p className="card-text"><strong>Email: </strong>{profileData?.email}</p>
          <p className="card-text"><strong>Phone: </strong>{profileData?.phone_no}</p>
          <p className="card-text"><strong>Address: </strong>{profileData?.address}</p>
          <p className="card-text"><strong>Storage Used: </strong>{profileData?.storage_used} MB</p>
          <p className="card-text"><strong>Verification Status: </strong>{profileData?.verify_status === 1 ? 'Verified' : 'Not Verified'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
