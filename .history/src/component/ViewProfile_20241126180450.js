import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [corpId, setCorpId] = useState(null); // State for corp_id

  // Fetch corp_id from API (similar to signup process)
  useEffect(() => {
    const fetchCorpId = async () => {
      try {
        // Example API request to get corp_id
        const response = await axios.get('http://103.35.121.219:4000/corp/dashboard/getCorpId', {
          headers: {
            Authorization: `Bearer YOUR_BEARER_TOKEN`, // Replace with the actual token
          },
        });

        if (response.data.code === 1000) {
          setCorpId(response.data.corp_id); // Assuming the API returns the corp_id
        } else {
          setError('Error fetching company ID.');
        }
      } catch (err) {
        setError('Error fetching company ID.');
        console.error('Error fetching company ID:', err);
      }
    };

    fetchCorpId();
  }, []);

  // Fetch profile data once corp_id is fetched
  useEffect(() => {
    if (!corpId) return; // Don't fetch profile data until corpId is available

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer YOUR_BEARER_TOKEN`, // Replace with the actual token
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError('Error fetching profile data.');
        }
      } catch (err) {
        setError('Error fetching profile data');
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId]); // Trigger fetching profile data when corpId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>View Profile</h2>
      {profileData ? (
        <div>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Corporate Name:</h5>
              <p>{profileData.company_name}</p>
            </div>

            <div className="col-md-6">
              <h5>Email:</h5>
              <p>{profileData.email}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Corporate Mobile Number:</h5>
              <p>{profileData.phone_no}</p>
            </div>

            <div className="col-md-6">
              <h5>Corporate Location:</h5>
              <p>{profileData.address}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Corporate User ID:</h5>
              <p>{profileData.username}</p>
            </div>

            <div className="col-md-6">
              <h5>Password:</h5>
              <p>{profileData.password}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Corporate Logo:</h5>
              {profileData.logo && (
                <img
                  src={`http://103.35.121.219:4000/uploads/${profileData.logo}`} // Assuming the logo is stored in the server and accessible via URL
                  alt="Corporate Logo"
                  style={{ width: '150px', height: '60px', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
