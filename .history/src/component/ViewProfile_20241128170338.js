import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const location = useLocation(); // To access the passed state from the navigate
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const { userId } = location.state || {}; // Retrieve userId from navigate state
    if (userId) {
      // Fetch the profile data
      axios
        .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          params: { corp_id: userId }, // Use the userId here
          headers: {
            Authorization: `!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz


>`, // Add your token here
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
  }, [location]);

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
