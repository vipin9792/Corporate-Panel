import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the URLSearchParams to fetch the corpId from the URL query
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId');

  useEffect(() => {
    if (corpId) {
      // Fetch the profile data with the corpId
      const fetchProfileData = async () => {
        try {
          const response = await fetch(`/api/getProfile?corpId=${corpId}`);  // Example endpoint
          if (!response.ok) {
            throw new Error('Profile data not found');
          }
          const data = await response.json();
          setProfileData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    } else {
      setError('Invalid or missing corpId');
      setLoading(false);
    }
  }, [corpId]);

  // Handle loading, error, and profile display
  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>{profileData ? JSON.stringify(profileData) : 'No profile data found'}</p>
    </div>
  );
};

export default ViewProfile;
