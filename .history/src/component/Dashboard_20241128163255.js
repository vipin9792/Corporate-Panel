import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ userId, token }) => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      console.log('Redirecting to login because token or userId is missing');
      navigate('/login');
    } else {
      fetchProfileData();
    }
  }, [token, userId, navigate]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Use the token here
          },
          params: {
            corp_id: userId,  // Use the userId here
          },
        }
      );
      
      if (response.data.code === 1000) {
        setProfileData(response.data.profile);
      } else {
        console.error('Failed to fetch profile data:', response.data);
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {profileData ? (
        <div>
          <h3>{profileData.name}</h3>
          <p>{profileData.email}</p>
          <p>{profileData.phone_no}</p>
          <p>{profileData.address}</p>
          <img src={profileData.logo} alt="Company Logo" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
