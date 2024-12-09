import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const location = useLocation();  // Access state passed by navigate
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const { userId } = location.state || {}; // Retrieve userId from state passed via navigate

    if (userId) {
      // Debugging the userId
      console.log('UserId in Profile Page:', userId);

      // Fetch profile data using the userId
      axios
        .get('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          params: { corp_id: userId }, // Passing userId to the API
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`,
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            console.log('Profile Data:', response.data.profile); // Log the fetched profile data
            setProfile(response.data.profile); // Set profile data
          } else {
            setError('Profile data not found');
          }
        })
        .catch((err) => {
          console.error('Error fetching profile:', err);
          setError('Error fetching profile data');
        })
        .finally(() => {
          setLoading(false); // Set loading to false once data is fetched
        });
    } else {
      setError('No userId found');
      setLoading(false); // Set loading to false if no userId
    }
  }, [location]); // Rerun effect when location or userId changes

  // Handle loading, error, and profile data rendering
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
