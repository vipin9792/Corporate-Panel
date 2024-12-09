import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Your Bearer Token

  useEffect(() => {
    const corpId = localStorage.getItem('corp_id'); 

    if (!corpId) {
      setError('No company ID found. Please log in again.');
      alert('No company ID found. Please log in again.'); 
      return;
    }

  
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      console.log('Fetching profile data...');  

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },  
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,  
            },
          }
        );

        console.log('API Response:', response);  

       
        if (response.data.code === 1000) {
          console.log('Profile data fetched successfully:', response.data.profile);
          setProfileData(response.data.profile); 
        } else {
          setError('Error fetching profile data.');
          alert('Error fetching profile data.');  
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
        alert('Error fetching profile data.');  
      } finally {
        setLoading(false);
        console.log('Fetching profile data finished.');  // Log when fetching ends
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something went wrong
  }

  return (
    <div>
      <h1>Profile Dashboard</h1>
      {profileData ? (
        <div>
          <div>
            <img
              src={profileData.logo}
              alt="Company Logo"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
          <h2>{profileData.company_name}</h2>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.phone_no}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Storage Used:</strong> {profileData.storage_used} MB</p>
          {/* Display more fields from profileData if needed */}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default ProfileDashboard;
