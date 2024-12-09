import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authToken, setAuthToken] = useState(''); // Token stored temporarily

  useEffect(() => {
    if (!authToken) {
      // If no token is found, redirect to login page
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: 1 },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [authToken, navigate]); // Fetch profile when token is available

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {profileData && (
        <div>
          <h2>{profileData.company_name}</h2>
          <p>{profileData.name}</p>
          <p>{profileData.email}</p>
          {/* Display other profile information */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
