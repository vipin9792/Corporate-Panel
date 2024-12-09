import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const ViewProfile = () => {
  // Here, we use userId instead of corp_id from the URL
  const { userId } = useParams();  // Access the userId parameter from the route

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the profile data using userId (instead of corp_id)
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
        corp_id: userId  // Here we are assuming userId is passed as corp_id in the API call
      }, {
        headers: {
          Authorization: `Bearer <your_token_here>`,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);  // Set profile if API returns success
        } else {
          setError('Profile data not found');
        }
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      })
      .finally(() => {
        setLoading(false);  // Stop loading once API request is complete
      });
  }, [userId]);  // Re-run the effect when userId changes

  if (loading) return <div>Loading...</div>;  // Show loading until data is fetched
  if (error) return <div>{error}</div>;  // Show error message if there's an error

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Company Name: {profile.company_name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone_no}</p>
          <p>Address: {profile.address}</p>
          <img src={profile.logo} alt="Profile Logo" />
          <p>Storage Used: {profile.storage_used} MB</p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
