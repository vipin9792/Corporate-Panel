import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { corp_id } = useParams();  // Access the corp_id parameter from the URL
  const navigate = useNavigate();

  const goToViewProfile = () => {
    // Navigate to ViewProfile with the corp_id in the URL
    navigate(`/Viewprofile/${corp_id}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, Corp ID: {corp_id}</p>
      <button onClick={goToViewProfile}>View Profile</button>
    </div>
  );
};

export default Dashboard;
