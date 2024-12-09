import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState({
    company_name: '',
    email: '',
    phone_no: '',
    address: '',
    username: '',
    logo: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const [token] = useState('!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'); // Hardcoded Bearer Token

  // Fetch corp_id using the token
  useEffect(() => {
    const fetchCorpId = async () => {
      try {
        if (!token) {
          throw new Error('Token is missing or invalid');
        }

        console.log("Fetching corp_id...");

        // Make an API call to fetch the corp_id
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token dynamically
          },
        });

        console.log("API Response:", response);  // Log the full response for debugging

        if (response && response.data) {
          console.log("Response data:", response.data);

          // Check for error in the response data
          if (response.data.code === 1000 && response.data.profile) {
            console.log("Profile fetched:", response.data.profile);
            setProfileData(response.data.profile); // Set the profile data
          } else {
            console.error("Error: Keys do not match or invalid code.");
            setError('API Error: Keys do not match or invalid token');
          }
        } else {
          console.error("Error: API response structure is incorrect.");
          setError('Error fetching profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false); // Set loading to false after the fetch attempt
      }
    };

    if (token) {
      fetchCorpId();
    }
  }, [token]);

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value, // Update the profileData state dynamically
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Mark the form as submitting

    // Create FormData to handle file upload
    const formData = new FormData();

    // Append all profile fields except logo to FormData
    Object.keys(profileData).forEach((key) => {
      if (key !== 'logo') {  // Exclude 'logo' from direct formData append
        formData.append(key, profileData[key]);
      }
    });

    // Check if logo is selected and append it
    if (profileData.logo) {
      formData.append('logo', profileData.logo);
    }

    try {
      // Sending updated profile data to the backend
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/fetchProfile', // Ensure this is the correct endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization: `Bearer ${token}`, // Ensure you are passing the correct Bearer token
          },
        }
      );

      // Check if the response code is successful
      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        // Update the state with the new profile data
        setProfileData(response.data.profile); // Assuming the response contains the updated profile
      } else {
        alert('Failed to update profile!');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile!');
    } finally {
      setIsSubmitting(false); // Reset submitting state after the submission attempt
    }
  };

  // Show loading state, error, or profile form
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available.</div>;
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
            <label htmlFor="phone_no" className="form-label">
              Corporate Mobile Number
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

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Corporate Location
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={profileData.address || ''}
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
              value={profileData.username || ''}
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
              value={profileData.password || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="logo" className="form-label">
            Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            className="form-control"
            onChange={(e) => setProfileData({ ...profileData, logo: e.target.files[0] })}
          />
          {profileData.logo && (
            <div>
              <img
                src={URL.createObjectURL(profileData.logo)}
                alt="Logo Preview"
                className="img-thumbnail mt-2"
                width="100"
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile1;
