import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Bearer Token for authorization (make sure it's valid)
  const BEARER_TOKEN = 'YOUR_BEARER_TOKEN_HERE';

  // Extract the corpId from the query parameters in the URL
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId'); // Get the corpId from the URL

  useEffect(() => {
    const fetchProfile = async () => {
      if (!corpId) {
        setError('Missing corpId parameter.');
        return navigate('/signup'); // Redirect to signup page if corpId is missing
      }

      setLoading(true);
      setError('');
      try {
        // Make the API call to fetch the profile
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId }, // Pass corp_id in the request body
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`, // Add Bearer Token here
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

    // Call the API only if corpId is present
    if (corpId) {
      fetchProfile();
    }
  }, [corpId, navigate]); // Dependencies include corpId and navigate to re-run the effect on changes

  // Render loading, error, or profile data
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="dashboard-container">
      <h2 className="text-center">Dashboard</h2>

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

export default Dashboard;
