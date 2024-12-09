import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const { corp_id } = useParams();  // Access the corp_id parameter
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the profile data using corp_id
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
        corp_id: corp_id  // Use corp_id directly
      }, {
        headers: {
          Authorization: `Bearer <!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
>`,
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
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);  // Trigger the effect when corp_id changes

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
