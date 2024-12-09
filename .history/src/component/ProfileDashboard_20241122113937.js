import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const corpId = localStorage.getItem('corp_id');
    if (!corpId) {
      setError('No company ID found. Please log in again.');
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId }, // Use dynamic corp_id from localStorage
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`, // Use token stored in localStorage
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError('Error fetching profile data');
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile Dashboard</h1>
      {profileData && (
        <div>
          <h2>{profileData.name}</h2>
          <p>{profileData.email}</p>
          {/* More profile data rendering */}
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
