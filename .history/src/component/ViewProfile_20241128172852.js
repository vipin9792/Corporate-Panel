import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const location = useLocation(); // Access the state passed via navigate
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const { userId } = location.state || {}; // Retrieve userId from state

    if (userId) {
      // Make API request to fetch profile data using the userId
      axios
        .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          params: { corp_id: userId }, // Use the userId to fetch the profile
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`,
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setProfile(response.data.profile); // Set profile data in state
          } else {
            setError('Profile data not found');
          }
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          setError('Error fetching profile data');
        })
        .finally(() => {
          setLoading(false); // Stop loading after request completes
        });
    } else {
      setError('No userId found');
      setLoading(false);
    }
  }, [location]); // Run when location or userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
