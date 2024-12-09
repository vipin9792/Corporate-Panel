import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile1 = () => {
  const { corp_id } = useParams(); // Get corp_id from URL params
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    company_name: "",
    email: "",
    phone: "",
    address: "",
    userid: "", // Add userid field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch profile data to populate the form
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Replace with your token
          },
        }
      )
      .then((response) => {
        console.log("Fetch Profile Response:", response);
        if (response.data.code === 1000) {
          setProfile({
            company_name: response.data.profile.company_name,
            email: response.data.profile.email,
            phone: response.data.profile.phone_no,
            address: response.data.profile.address,
            userid: response.data.profile.username, // Set the username as userid
          });
        } else {
          setError("Error fetching profile data");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      });
  }, [corp_id]); // Refetch profile data if corp_id changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value, // Dynamically update the field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    console.log("Submitting Profile Data:", profile); // Log the profile data before submitting

    // Make API call to update the profile
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/updateProfile",
        {
          corp_id, 
          company_name: profile.company_name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          userid: profile.userid, // Include the userid here
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz


`, // Replace with your token
          },
        }
      )
      .then((response) => {
        console.log("Update Profile Response:", response); // Log the response
        if (response.data.code === 1000) {
          setSuccess("Profile updated successfully!");
          // Delay the navigation to show the success message
          setTimeout(() => {
            navigate(`/profile/${corp_id}`); // Redirect to the profile view page after success
          }, 1500);
        } else {
          setError("Error updating profile: " + response.data.status); // Log server error
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Error occurred while updating profile: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
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
        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            name="userid"
            value={profile.userid}
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
