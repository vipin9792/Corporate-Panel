\import React, { useEffect, useState } from 'react';
import { useCorpId } from '../context/CorpIdContext';  // Access the corpId from context
import axios from 'axios';

const Dashboard = () => {
  const { corpId } = useCorpId();  // Get the corpId from context
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!corpId) {
        setError('No corp_id found. Please log in.');
        return;
      }

      // Retrieve the token from localStorage (or from wherever you're storing it)
      const token = localStorage.getItem('authToken');  // Replace with actual storage method

      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      try {
        const response = await axios.post(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Add the token to the Authorization header
            },
          }
        );

        if (response.status === 200 && response.data.code === 1000) {
          setProfile(response.data.profile);  // Set profile data
        } else {
          setError('Failed to fetch profile data.');
        }
      } catch (err) {
        setError('Error fetching profile data.');
      }
    };

    fetchProfile();
  }, [corpId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Company Name: {profile.company_name}</p>
      <p>Email: {profile.email}</p>
      {/* Render other profile details */}
    </div>
  );
};

export default Dashboard;
