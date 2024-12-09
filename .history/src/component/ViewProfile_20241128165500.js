import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the userId from localStorage
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Fetch the profile data using userId
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(
            `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
            {
              params: { corp_id: userId }, // Pass userId (corp_id) in query params
              headers: {
                Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
              },
            }
          );

          if (response.data.code === 1000) {
            setProfile(response.data.profile);
          } else {
            setError('Failed to fetch profile data.');
          }
        } catch (err) {
          setError('An error occurred while fetching profile data.');
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    } else {
      setError('User is not logged in');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {profile && (
        <div className="profile-details">
          <div className="profile-item">
            <label>Company Name:</label>
            <input type="text" value={profile.company_name} readOnly />
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <input type="email" value={profile.email} readOnly />
          </div>
          <div className="profile-item">
            <label>Phone:</label>
            <input type="text" value={profile.phone_no} readOnly />
          </div>
          <div className="profile-item">
            <label>Address:</label>
            <input type="text" value={profile.address} readOnly />
          </div>
          <div className="profile-item">
            <label>Profile Logo:</label>
            <img src={profile.logo} alt="Profile Logo" />
          </div>
          <div className="profile-item">
            <label>Storage Used:</label>
            <input type="text" value={`${profile.storage_used} MB`} readOnly />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
