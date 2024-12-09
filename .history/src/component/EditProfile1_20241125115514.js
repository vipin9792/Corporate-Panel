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
  const [corpId, setCorpId] = useState(localStorage.getItem('corp_id')); // Get corp_id from localStorage

  // Fetch profile data using corp_id and token
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token || !corpId) {
          throw new Error('Token or corp_id is missing');
        }

        console.log("Fetching profile data...");

        // Make an API call to fetch profile data
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          corp_id: corpId, // Include corp_id in the request body
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response && response.data && response.data.profile) {
          console.log("Profile fetched:", response.data.profile);
          setProfileData(response.data.profile); // Set the profile data
        } else {
          setError('Error fetching profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (corpId) {
      fetchProfileData();
    }
  }, [token, corpId]);

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
        'http://103.35.121.219:4000/corp/dashboard/updateProfile', // Ensure this is the correct endpoint for updating profile
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization: `Bearer ${token}`, // Ensure you are passing the correct Bearer token
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
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

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            className="form-control"
            value={profileData.company_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_no">Phone Number</label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            className="form-control"
            value={profileData.phone_no}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={profileData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={profileData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={profileData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="logo">Logo</label>
          <input
            type="file"
            id="logo"
            name="logo"
            className="form-control"
            onChange={(e) => setProfileData({ ...profileData, logo: e.target.files[0] })}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile1;
