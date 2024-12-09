import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Corrected import for useNavigate

const EditProfile1 = () => {
  const { corp_id } = useParams(); // Access the corp_id from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [profile, setProfile] = useState({
    company_name: "",
    email: "",
    phone: "",  // Ensure phone is part of the state
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch the current profile data to pre-fill the form
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Add your token
          },
        }
      )
      .then((response) => {
        console.log("Profile data fetched:", response.data); // Log the full response
        if (response.data.code === 1000) {
          setProfile(response.data.profile); // Set the profile state with the full response
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      });
  }, [corp_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value, // Dynamically update the field name
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/updateProfile",
        {
          corp_id,
          company_name: profile.company_name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Add your token
          },
        }
      )
      .then((response) => {
        console.log("Response:", response); // Log the full response for debugging
        if (response.data.code === 1000) {
          setSuccess("Profile updated successfully!");
          setLoading(false);
          // Delay the navigation to give time for success message to display
          setTimeout(() => {
            navigate(`/profile/${corp_id}`); // Redirect after successful update
          }, 1500); // Redirect after 1.5 seconds
        } else {
          setError(response.data.status || "Error updating profile");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        if (err.response) {
          setError(`Error: ${err.response.data.status || "Unknown error"}`);
        } else {
          setError("Error occurred. Please try again.");
        }
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-3">
      <h3>Edit Profile</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={profile.company_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile1;
