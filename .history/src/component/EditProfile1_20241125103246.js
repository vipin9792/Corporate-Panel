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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const corpId = localStorage.getItem("corp_id"); // Retrieve corp_id from localStorage

  // Fetch profile data when the component mounts
  useEffect(() => {
    if (!corpId) {
      setError("Corp ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      try {
        console.log("Fetching profile data for corp_id:", corpId);

        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your actual token
            },
          }
        );

        console.log("Response from API:", response);

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError(response.data.message || "Failed to fetch profile data");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Error fetching profile data. Please try again.");
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = { ...profileData, corp_id: corpId }; // Add corp_id to form data

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/dashboard/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Replace with your actual token
          },
        }
      );

      if (response.data.code === 1000) {
        setSuccessMessage("Profile updated successfully!");
        setProfileData(response.data.profile); // Update profile data with response
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading, error or success messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          {/* Company Name */}
          <div className="col-md-6">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-control"
              value={profileData.companyName || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="emailId" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              className="form-control"
              value={profileData.emailId || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Phone Number */}
          <div className="col-md-6">
            <label htmlFor="phoneNo" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              className="form-control"
              value={profileData.phoneNo || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Address */}
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={profileData.address || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* User ID */}
          <div className="col-md-6">
            <label htmlFor="userid" className="form-label">
              User ID
            </label>
            <input
              type="text"
              id="userid"
              name="userid"
              className="form-control"
              value={profileData.userid || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label htmlFor="passwd" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="passwd"
              name="passwd"
              className="form-control"
              value={profileData.passwd || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          {/* Full Name */}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={profileData.name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile1;
