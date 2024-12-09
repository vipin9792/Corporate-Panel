import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: localStorage.getItem('corp_id') },
          {
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
            },
          }
        );
        console.log('Profile fetched successfully:', response.data); // Log the response
        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
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
      console.log('Sending form data:', formData); // Log the form data before submission

      // Send the form data to the API
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile', // Replace with your correct API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      console.log('Response from update API:', response); // Log the response from the API

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        setProfileData((prevData) => ({
          ...prevData,
          ...response.data.profile, // Update the profile data with the response
        }));
      } else {
        alert('Failed to update profile!'); // Show the error message from the API
        setError('Failed to update profile');
      }
    } catch (err) {
      console.error('Error during form submission:', err);
      alert('Error during profile update!');
      setError('Error during profile update');
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
        {/* Form Inputs */}
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

        {/* Add more input fields as needed */}
        
        {/* Submit Button */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
