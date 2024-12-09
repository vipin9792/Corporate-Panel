import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage
    if (userId) {
      // Fetch the profile data
      axios
        .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          params: { corp_id: userId },
          headers: {
            Authorization: `Bearer <your_token_here>`,
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setProfile(response.data.profile);
          } else {
            setError('Profile data not found');
          }
        })
        .catch((err) => {
          setError('Error fetching profile data');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {profile && (
        <div>
          <p>Company Name: {profile.company_name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone_no}</p>
          <p>Address: {profile.address}</p>
          <img src={profile.logo} alt="Profile Logo" />
          <p>Storage Used: {profile.storage_used} MB</p>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
