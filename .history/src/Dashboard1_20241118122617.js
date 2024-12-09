import React from "react";
import { Redirect } from "react-router-dom";

const Dashboard = ({ userProfile }) => {
  if (!userProfile) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome, {userProfile.company_name}!</h3>
      <p>Email: {userProfile.email}</p>
      <p>Phone: {userProfile.phone_no}</p>
      <p>Company Address: {userProfile.address}</p>
    </div>
  );
};

export default Dashboard;
