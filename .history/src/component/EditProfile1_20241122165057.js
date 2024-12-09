import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [newLogo, setNewLogo] = useState(null); // State to hold the new logo file
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  useEffect(() => {
    const corpId = localStorage.getItem("corp_id"); // Get corp_id from localStorage

    if (!corpId) {
      setError("No company ID found. Please log in again.");
      alert("No company ID found. Please log in again.");
      return;
    }

    // Fetch profile data from the API
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError("Error fetching profile data.");
          alert("Error fetching profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Error fetching profile data");
        alert("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogoChange = (e) => {
    setNewLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newLogo) {
      const formData = new FormData();
      formData.append("logo", newLogo); // Append the new logo file

      const corpId = localStorage.getItem("corp_id"); // Get corp_id from localStorage

      try {
        setLoading(true);
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/updateLogo", // Your API endpoint to update logo
          formData,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
              "Content-Type": "multipart/form-data", // Important for file upload
            },
          }
        );

        if (response.data.code === 1000) {
          alert("Logo updated successfully!");
          setProfileData({ ...profileData, logo: response.data.logo });
        } else {
          alert("Error updating logo.");
        }
      } catch (error) {
        console.error("Error updating logo:", error);
        alert("Error updating logo.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger my-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Edit Your Profile</h2>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Logo:</label>
          <div className="mb-2 text-center">
            <img
              src={profileData ? profileData.logo : ""}
              alt="Current Logo"
              className="img-fluid rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            className="form-control"
            onChange={handleLogoChange}
          />
        </div>

        {/* Corporate Name */}
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="form-control"
            value={profileData ? profileData.company_name : ""}
            onChange={(e) =>
              setProfileData({ ...profileData, company_name: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={profileData ? profileData.email : ""}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label htmlFor="phone_no" className="form-label">Phone Number:</label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            className="form-control"
            value={profileData ? profileData.phone_no : ""}
            onChange={(e) =>
              setProfileData({ ...profileData, phone_no: e.target.value })
            }
          />
        </div>

        {/* Address */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={profileData ? profileData.address : ""}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
          />
        </div>

        {/* Corporate User ID */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Corporate User ID:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={profileData ? profileData.username : ""}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
