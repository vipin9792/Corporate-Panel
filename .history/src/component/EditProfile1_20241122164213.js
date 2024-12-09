import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    company_name: "",
    email: "",
    phone_no: "",
    address: "",
  });

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  useEffect(() => {
    const corpId = localStorage.getItem('corp_id'); // Get corp_id from localStorage

    if (!corpId) {
      alert('No company ID found. Please log in again.');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
          setFormData({
            username: response.data.profile.username,
            company_name: response.data.profile.company_name,
            email: response.data.profile.email,
            phone_no: response.data.profile.phone_no,
            address: response.data.profile.address,
          });
        } else {
          alert('Error fetching profile data.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        alert('Error fetching profile data.');
      }
    };

    fetchProfileData();
  }, []);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  // Update the corresponding field in the state
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be updated
    const updatedProfile = {
      username: formData.username,
      company_name: formData.company_name,
      email: formData.email,
      phone_no: formData.phone_no,
      address: formData.address,
    };

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;  // Show loading if profileData hasn't been fetched
  }

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="company_name">Corporate Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            className="form-control"
            value={formData.company_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone_no">Corporate Mobile Number</label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            className="form-control"
            value={formData.phone_no}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Corporate Location</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="username">Corporate User ID</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile1;
