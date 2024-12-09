import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile data from the backend using corp_id stored in localStorage
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
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
            },
          }
        );

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

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      if (key !== 'logo') {
        formData.append(key, profileData[key]);
      }
    });

    if (profileData.logo) {
      formData.append('logo', profileData.logo);
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        setProfileData((prevData) => ({
          ...prevData,
          ...response.data.profile,
        }));
      } else {
        alert('Failed to update profile!');
        setError('Failed to update profile');
      }
    } catch (err) {
      alert('Error during profile update!');
      console.error('Error during form submission:', err);
      setError('Error during profile update');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show the error message
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
                value={profileData.company_name || ''}
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
                value={profileData.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={profileData.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="phone_no" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_no"
                name="phone_no"
                className="form-control"
                value={profileData.phone_no || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Additional fields can be added here */}

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
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
