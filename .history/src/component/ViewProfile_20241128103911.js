import React from 'react';
import { useUserContext } from './UserContext'; // Assuming the context is in the same directory

const Profile = () => {
  const { user, loading, error } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Corp ID: {user.corp_id}</p>
    </div>
  );
};

export default Profile;
