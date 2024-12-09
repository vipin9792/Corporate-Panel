import React from "react";

const Profile = ({ userProfile }) => {
  return (
    <div>
      <h3>User Profile</h3>
      <p>Company Name: {userProfile.company_name}</p>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Phone: {userProfile.phone_no}</p>
      <p>Address: {userProfile.address}</p>
      <img src={userProfile.logo} alt="Logo" width="100" />
    </div>
  );
};

export default Profile;
