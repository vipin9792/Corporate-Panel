import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the profile data using userId
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
          {
            params: { corp_id: userId }, // Pass userId (corp_id) in query params
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Example token, replace with actual token if needed
            },
          }
        );

        if (response.data.code === 1000) {
          setProfile(response.data.profile);
        } else {
          setError('Failed to fetch profile data.');
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('An error occurred while fetching profile data.');
      } finally {
        setLoading(false);
      }
    };

    // If userId exists, call the function to fetch profile data
    if (userId) {
      fetchProfileData();
    } else {
      setError('User not logged in.');
      setLoading(false);
      navigate('/LoginForm'); // Redirect if userId is not available
    }
  }, [userId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      {profile && (
        <div className="profile-form">
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={profile.company_name}
              readOnly
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={profile.phone_no}
              readOnly
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={profile.address}
              readOnly
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={profile.email}
              readOnly
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={profile.username}
              readOnly
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Profile Picture</label>
            <img
              src={profile.logo}
              alt="Profile Logo"
              style={{ width: '100px', height: '100px' }}
            />
          </div>

          <div className="form-group">
            <label>Storage Used</label>
            <input
              type="text"
              value={`${profile.storage_used} MB`}
              readOnly
              className="form-control"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
