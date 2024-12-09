import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Bearer Token for authorization
  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  // Extract the corpId from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId');

  // Fetch profile data based on the corpId
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');

      try {
        // Make the API call to fetch the profile
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },  // Passing corp_id in the request body
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,  // Add Bearer Token here
            },
          }
        );

        if (response.data.code === 1000) {
          setProfile(response.data.profile);  // Store profile data in state
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching profile data.');
      } finally {
        setLoading(false);
      }
    };

    if (corpId) {
      fetchProfile();
    } else {
      navigate('/signup');  // Redirect to signup page if no corpId is provided
    }
  }, [corpId, navigate]);

  // Render loading, error, or profile data
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="profile-container">
      <h2 className="text-center">Profile Details</h2>

      {profile && (
        <div className="profile-info">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              className="form-control"
              value={profile.company_name}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={profile.email}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="tel"
              id="phoneNo"
              className="form-control"
              value={profile.phone_no}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-control"
              value={profile.address}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={profile.name}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">User ID</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={profile.username}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo">Logo</label>
            <img src={profile.logo} alt="Company Logo" className="img-fluid" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ;
