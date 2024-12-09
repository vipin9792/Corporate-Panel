import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const location = useLocation(); // Get location from React Router
  const history = useHistory(); // For navigation after updating the profile

  const corpId = location.state?.corpId || localStorage.getItem('corp_id'); // Use the passed corpId

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
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
  }, [corpId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value, // Update the profileData state dynamically
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Mark the form as submitting

    // Create FormData to handle file upload
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(profileData).forEach((key) => {
      if (key !== 'logo') {  // We handle the logo separately
        formData.append(key, profileData[key]);
      }
    });

    if (profileData.logo) {
      formData.append('logo', profileData.logo);
    }

    try {
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

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        history.push('/ViewProfile'); // Navigate back to ViewProfile after successful update
      } else {
        alert('Failed to update profile!');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile!');
    } finally {
      setIsSubmitting(false); // Reset submitting state after submission attempt
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Form fields */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="company_name" className="form-label">Corporate Name</label>
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
            <label htmlFor="email" className="form-label">Email</label>
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
        {/* Other form fields here... */}

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
