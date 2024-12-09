import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const [corpId, setCorpId] = useState(null); // New state to hold the corp_id

  // Fetch the corp_id first from an API
  useEffect(() => {
    const fetchCorpId = async () => {
      try {
        console.log("Fetching corp_id...");

        // Make an API call to fetch the corp_id
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {}, {
          headers: {
            Authorization: `Bearer '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'`,
          },
        });

        console.log("API Response:", response);  // Log the full response for debugging

        if (response && response.data) {
          console.log("Response data:", response.data);

          // Ensure the response contains the correct structure
          if (response.data.code === 1000 && response.data.corp_id) {
            console.log("corp_id fetched:", response.data.corp_id);
            setCorpId(response.data.corp_id); // Set the corp_id
          } else {
            console.error("Error: No valid corp_id in response or invalid code.");
            setError('Error fetching corp_id.');
            setLoading(false); // Set loading to false when there's an error
          }
        } else {
          console.error("Error: API response structure is incorrect.");
          setError('Error fetching corp_id');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching corp_id:', err);
        setError('Error fetching corp_id');
        setLoading(false); // Set loading to false when there's an error
      }
    };

    fetchCorpId();
  }, []);  // Run only once when component mounts

  // Fetch profile data when the corp_id is fetched
  useEffect(() => {
    if (corpId) {
      const fetchProfileData = async () => {
        try {
          console.log("Fetching profile data for corp_id:", corpId);

          const response = await axios.post(
            'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
            { corp_id: corpId }, // Now using the fetched corp_id
            {
              headers: {
                Authorization: `Bearer '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'`, // Pass the correct token
              },
            }
          );

          console.log("Profile data fetched: ", response.data);

          // Check if the response contains profile data
          if (response.data.code === 1000) {
            setProfileData(response.data.profile); // Set profile data if successful
          } else {
            setError('Error fetching profile data.');
          }
        } catch (err) {
          console.error('Error fetching profile data:', err);
          setError('Error fetching profile data');
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [corpId]); // Only fetch profile data when corp_id is available

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
            Authorization: `Bearer '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'`, // Ensure you are passing the correct Bearer token
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

        <div className="mb-3">
          <label htmlFor="logo" className="form-label">
            Upload Logo
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting} // Disable the button while submitting
          >
            {isSubmitting ? 'Submitting...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile1;
