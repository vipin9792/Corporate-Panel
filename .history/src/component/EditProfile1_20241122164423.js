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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="logo">Logo:</label>
          <div className="logo-preview">
            <img
              src={profileData ? profileData.logo : ""}
              alt="Current Logo"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>

        {/* Other fields (e.g., company name, email, etc.) */}
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={profileData ? profileData.company_name : ""}
            onChange={(e) =>
              setProfileData({ ...profileData, company_name: e.target.value })
            }
          />
        </div>
        {/* Add other input fields here as necessary */}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
