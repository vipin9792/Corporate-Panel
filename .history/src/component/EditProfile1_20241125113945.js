import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const [corpId, setCorpId] = useState(null); // New state to hold the corp_id
  const [token, setToken] = useState(null); // Add token state

  // Fetch token (example: from localStorage or other secure storage)
  useEffect(() => {
    const fetchToken = () => {
      const storedToken = localStorage.getItem('auth_token'); // Example token storage
      if (storedToken) {
        setToken(storedToken); // Set the token if available
      } else {
        setError('Token not found. Please log in again.');
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

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

          // Ensure the response contains the correct structure
          if (response.data.code === 1000 && response.data.profile) {
            console.log("Profile fetched:", response.data.profile);
            setProfileData(response.data.profile); // Set the profile data
          } else {
            console.error("Error: No valid profile in response or invalid code.");
            setError('Error fetching profile data.');
            setLoading(false); // Set loading to false when there's an error
          }
        } else {
          console.error("Error: API response structure is incorrect.");
          setError('Error fetching profile data');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
        setLoading(false); // Set loading to false when there's an error
      }
    };

    if (token) {
      fetchCorpId();
    }
  }, [token]); // Fetch corp_id only when token is available

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
                setProfileData((prevState) => ({
                  ...prevState,
                  logo: e.target.files[0], // Update the logo with the selected file
                }));
              }}
            />
            {profileData.logo && typeof profileData.logo === 'string' && (
              <img
                src={profileData.logo}
                alt="Corporate Logo"
                className="img-fluid mt-3"
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting} // Disable the button while submitting
        >
          {isSubmitting ? 'Submitting...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile1;
