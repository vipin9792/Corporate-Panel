import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // To extract query params from the URL
import axios from 'axios';

const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId');  // Extract corpId from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!corpId) {
      alert('No corp_id found.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`,
          {
            headers: {
              Authorization: `Bearer YOUR_BEARER_TOKEN`,
            },
          }
        );

        if (response.status === 200 && response.data.profile) {
          setProfile(response.data.profile);
        } else {
          setError("Failed to load profile.");
          alert("Failed to load profile.");
        }
      } catch (error) {
        setError('Error fetching profile: ' + error.message);
        alert('Error fetching profile: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [corpId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      {profile ? (
        <div>
          <p><strong>Company Name:</strong> {profile.company_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone_no}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Full Name:</strong> {profile.name}</p>
          <img src={profile.logo} alt="Company Logo" />
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Profile;
