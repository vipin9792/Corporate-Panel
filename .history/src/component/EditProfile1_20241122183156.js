import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const corp_id = localStorage.getItem('corp_id');
      if (!corp_id) {
        setError('Corp ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id },
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`,
            },
          }
        );

        console.log('API Response:', response.data);  // Log the response data

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError('Error fetching profile data');
        }
      } catch (err) {
        setError('Error fetching profile data');
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      {profileData ? (
        <form onSubmit={handleFormSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="company_name" className="form-label">
                Corporate Name
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                className="form-control"
                value={profileData?.company_name || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={profileData?.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Other fields */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default EditProfile1;
