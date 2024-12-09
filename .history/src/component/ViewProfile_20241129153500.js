import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const { corp_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
        corp_id: corp_id,
      }, {
        headers: {
          Authorization: `Bearer <YOUR_TOKEN>`,
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
  }, [corp_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {profile ? (
        <div>
          <h1>Profile of {profile.company_name}</h1>
          {/* Render profile details here */}
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
