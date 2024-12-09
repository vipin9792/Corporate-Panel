import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting

  const corpId = localStorage.getItem('corp_id'); // Retrieve corp_id from localStorage

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log("Fetching profile data..."); // Log when fetching starts
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
          console.log("Profile data fetched successfully:", response.data.profile); // Log successful fetch
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          console.error('Error fetching profile data:', response.data.message);
          setError('Error fetching profile data.');
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
        console.log("Profile data fetch completed."); // Log completion of fetching
      }
    };
    if (corpId) {
      fetchProfileData(); // Fetch data only if corp_id exists
    } else {
      setError('Corp ID is missing.');
    }
  }, [corpId]); // Added corpId dependency to make sure it updates when corpId changes

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`); // Log input changes
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value, // Update the profileData state dynamically
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Mark the form as submitting
    console.log("Form submission started..."); // Log when form submission starts

    // Create FormData to handle file upload
    const formData = new FormData();

    // Append form fields to FormData
    Object.keys(profileData).forEach((key) => {
      if (key !== 'logo') {  // We handle the logo separately
        formData.append(key, profileData[key]);
      }
    });

    // Check if logo is selected and append it
    if (profileData.logo) {
      formData.append('logo', profileData.logo);
    }

    // Add corp_id to the formData
    formData.append('corp_id', corpId);

    try {
      // Sending updated profile data to the backend
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile', // Replace with your correct API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your actual token
          },
        }
      );

      // Check if the response code is successful
      if (response.data.code === 1000) {
        console.log("Profile updated successfully:", response.data.profile); // Log successful update
        alert('Profile updated successfully!');
        // Update the state with the new profile data
        setProfileData(response.data.profile); // Assuming the response contains the updated profile
      } else {
        console.error('Failed to update profile:', response.data.message);
        alert('Failed to update profile!');
      }
    } catch (err) {
      console.error('Error updating profile:', err); // Log error during form submission
      alert('Error updating profile!');
    } finally {
      setIsSubmitting(false); // Reset submitting state after the submission attempt
      console.log("Form submission completed."); // Log completion of form submission
    }
  };

  // Show loading or error messages if fetching is still in progress
  if (loading) {
    console.log("Loading profile data..."); // Log when loading
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error encountered:", error); // Log if there is an error
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

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="phone_no" className="form-label">
              Corporate Mobile Number
            </label>
            <input
              type="text"
              id="phone_no"
              name="phone_no"
              className="form-control"
              value={profileData ? profileData.phone_no : ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Corporate Location
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={profileData ? profileData.address : ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Corporate User ID
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={profileData ? profileData.username : ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={profileData ? profileData.password : ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="logo" className="form-label">
              Corporate Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              className="form-control"
              onChange={(e) => {
                console.log("Logo selected:", e.target.files[0]); // Log logo selection
                setProfileData({
                  ...profileData,
                  logo: e.target.files[0], // Update the logo field
                });
              }}
            />
          </div>
          <div className="col-md-6">
            {profileData?.logo && (
              <img
                src={URL.createObjectURL(profileData.logo)} // Use URL.createObjectURL for the selected logo
                alt="Logo"
                style={{ width: '150px', height: '60px', objectFit: 'cover' }}
              />
            )}
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
