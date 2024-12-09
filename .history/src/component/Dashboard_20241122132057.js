import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);

  // Replace with valid token (e.g., after relogin or token refresh)
  const token = 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Ensure you have a valid token here

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('Making API request to fetch profile data...');
        
        // Make the request with the updated token
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: 1 }, // Include corp_id in the body if necessary
          {
            headers: {
              Authorization: token, // Set the updated Authorization header
            },
          }
        );

        console.log('API Response:', response);

        // Handle successful response
        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Save profile data to state
        } else {
          console.error('API Response Error:', response.data);
          alert('API Response Error: ' + response.data.status); // Provide error alert
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        console.error('API Fetch Error:', err);
        if (err.response) {
          // Check if we have response object
          console.error('Response error:', err.response);
          alert('API Error: ' + (err.response?.data?.status || err.message));
        } else {
          console.error('Network error:', err);
        }
        alert('Error fetching data: ' + err.message); // Show alert with error message
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]); // Ensure token is up to date when it's changed

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <br />
        <small>Check console for more details.</small>
      </div>
    );
  }

  return (
    <div className="profile-dashboard container">
      <div className="card" style={{ width: '18rem', margin: '20px auto', padding: '20px', borderRadius: '10px' }}>
        <div className="text-center">
          <img
            src={profileData?.logo || 'https://via.placeholder.com/100'}
            alt="Company Logo"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>

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
