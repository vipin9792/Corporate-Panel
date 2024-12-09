import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract token and userId from location.state
  const { token, userId } = location.state || {}; // Fallback to empty object if state is undefined

  console.log("Token:", token, "User ID:", userId);  // Debugging

  useEffect(() => {
    // If no token or userId, redirect to login page
    if (!token || !userId) {
      console.log("Redirecting to login because token or userId is missing.");
      navigate('/login'); // Redirect to login if token or userId is missing
      return;
    }

    // Fetch the user's profile data from the API
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',  // Profile fetching API
          { corp_id: userId },
          {
            headers: { Authorization: `Bearer ${token}` },  // Pass token in Authorization header
          }
        );

        // Check if the API call was successful
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
  }, [token, userId, navigate]);  // Effect will run on token or userId change

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
