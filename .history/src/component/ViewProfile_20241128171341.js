import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const location = useLocation(); // To access the passed state from the navigate
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const { userId } = location.state || {}; // Retrieve userId from navigate state

    console.log('Location State:', location.state);  // Debugging: Check if userId is passed
    console.log('User ID:', userId);  // Check if userId is correctly extracted

    if (userId) {
      // Fetch the profile data
      axios
        .get('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          params: { corp_id: userId }, // Use the userId here
          headers: {
            Authorization: `Bearer <your_token_here>`, // Ensure to add your token here
          },
        })
        .then((response) => {
          console.log('API Response:', response); // Log the response to debug
          if (response.data.code === 1000) {
            setProfile(response.data.profile); // Set profile data to state
          } else {
            setError('Profile data not found');
          }
        })
        .catch((err) => {
          console.error('Error fetching profile:', err); // Catch API errors
          setError('Error fetching profile data');
        })
        .finally(() => {
          setLoading(false); // Set loading to false when request completes
        });
    } else {
      setError('No user ID found in state');
      setLoading(false);
    }
  }, [location]);

  // Show loading state
  if (loading) return <div>Loading...</div>;

  // Show error state
  if (error) return <div>{error}</div>;

  // Render profile data
  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Company Name: {profile.company_name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone_no}</p>
          <p>Address: {profile.address}</p>
          <img src={profile.logo} alt="Profile Logo" />
          <p>Storage Used: {profile.storage_used} MB</p>
        </div>
      ) : (
        <p>No profile data available</p> // Show this if profile data is not loaded
      )}
    </div>
  );
};

export default ViewProfile;
