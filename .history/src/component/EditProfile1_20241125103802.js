import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState({
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your token
  const PROFILE_API_URL = 'http://103.35.121.219:4000/corp/dashboard/fetchProfile';  // API endpoint

  // Fetch profile data from the server
  const fetchProfileData = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.get(PROFILE_API_URL, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,  // Sending the Bearer Token
        },
      });

      if (response.status === 200 && response.data) {
        // Populate the form fields with the fetched profile data
        setProfileData({
          companyName: response.data.companyName || "",
          emailId: response.data.emailId || "",
          phoneNo: response.data.phoneNo || "",
          address: response.data.address || "",
          userid: response.data.userid || "",
          passwd: response.data.passwd || "",
          name: response.data.name || "",
        });
        setSuccessMessage("Profile data fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      if (error.response) {
        setError(error.response.data.message || "An error occurred while fetching profile data.");
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Send updated data to the server
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        setError(error.response.data.message || "An error occurred while updating the profile.");
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={profileData.companyName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailId">Email</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={profileData.emailId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            value={profileData.phoneNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userid">User ID</label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={profileData.userid}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwd">Password</label>
          <input
            type="password"
            id="passwd"
            name="passwd"
            value={profileData.passwd}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile1;
