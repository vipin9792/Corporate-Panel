import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract token and userId from location state
  const { token, userId } = location.state || {}; // location.state will have the data passed from LoginForm

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login'); // If no token or userId found, redirect to login page
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: userId },  // Send user ID to fetch data
          {
            headers: { Authorization: `Bearer ${token}` },  // Use token for authentication
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, userId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome, {profileData.name}</h1>
      <p>Company: {profileData.company_name}</p>
      <p>Email: {profileData.email}</p>
      {/* Render other profile data here */}
    </div>
  );
};

export default Dashboard;
