import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Bearer Token for authorization (make sure it's valid)
  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  // Extract the corpId and userid from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId');
  const userId = queryParams.get('userid');  // Assuming userId is also passed in the query params

  useEffect(() => {
    const fetchProfile = async () => {
      if (!corpId || !userId) {
        setError('Missing corpId or userid parameter.');
        return navigate('/signup'); // Redirect to signup page if corpId or userid is missing
      }

      setLoading(true);
      setError('');
      try {
        // Make the API call to fetch the profile using both corpId and userId
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId, user_id: userId },  // Pass both corpId and userId
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,  // Add Bearer Token here
            },
          }
        );

        // Check if response is valid JSON
        if (response.headers['content-type'].includes('application/json')) {
          const data = response.data;
          if (data.code === 1000) {
            setProfile(data.profile); // Set profile data to state
          } else {
            setError('Failed to fetch profile data');
          }
        } else {
          setError('Unexpected response format (HTML instead of JSON)');
        }
      } catch (err) {
        console.error(err);
        // Handle different error cases:
        if (err.response) {
          // API error (e.g., 401 Unauthorized, 500 Internal Server Error)
          setError(`API error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          // No response from server
          setError('No response from the server');
        } else {
          // Other errors (e.g., request setup errors)
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the API only if corpId and userId are both present
    if (corpId && userId) {
      fetchProfile();
    }
  }, [corpId, userId, navigate]);

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

export default ViewProfile;
