import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const corpId = localStorage.getItem('corp_id'); // Get corp_id from localStorage

    if (!corpId) {
      setError('No company ID found. Please log in again.');
      return;
    }

    // Function to fetch profile data from the API
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your actual API endpoint
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`, // Authorization token from localStorage
            },
          }
        );

        // Check if the API returned profile data successfully
        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError('Error fetching profile data.');
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something went wrong
  }

  return (
    <div>
      <h1>Profile Dashboard</h1>
      {profileData ? (
        <div>
          <h2>{profileData.name}</h2>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.phoneNo}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          {/* Display more fields from profileData if needed */}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default ProfileDashboard;
