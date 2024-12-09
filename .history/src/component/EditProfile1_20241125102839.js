import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const corpId = localStorage.getItem('corp_id'); // Retrieve corp_id from localStorage

  // Fetch profile data when the component mounts
  useEffect(() => {
    if (!corpId) {
      setError('Corp ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your actual token
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError(response.data.message || 'Failed to fetch profile data');
        }
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId]); // Dependency on corpId to re-fetch data if it changes

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    if (profileData.logo) {
      formData.append('logo', profileData.logo);
    }

    formData.append('corp_id', corpId);

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        setProfileData(response.data.profile);
      } else {
        alert('Failed to update profile!');
      }
    } catch (err) {
      alert('Error updating profile!');
    } finally {
      setIsSubmitting(false);
    }
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
              value={profileData ? profileData.company_name : ''}
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
              value={profileData ? profileData.email : ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile1;
