import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import Footer from "./Footer"; // Assuming you have a Footer component

const EditProfile1 = () => {
  const { corp_id } = useParams(); // Access the corp_id from the URL
  const navigate = useNavigate(); // For navigation after successful update

  const [profile, setProfile] = useState({
    company_name: "",
    email: "",
    phone_no: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch the profile data using corp_id when the component mounts
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile", // Fetch profile API
        { corp_id: corp_id }, // Send corp_id in the request
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Replace with your actual token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile); // Set profile data
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is complete
      });
  }, [corp_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value }); // Update the specific profile field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/updateProfile", // Update profile API endpoint
        {
          corp_id: corp_id,
          company_name: profile.company_name,
          email: profile.email,
          phone: profile.phone_no,
          address: profile.address,
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Authorization token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setSuccessMessage("Profile updated successfully!"); // Show success message
          setError(""); // Clear any errors
          setTimeout(() => {
            navigate(`/profile/${corp_id}`); // Redirect to the profile page after 3 seconds
          }, 3000);
        } else {
          setError("Error updating profile");
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Error updating profile");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is complete
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const showSuccessMessage = successMessage && (
    <div className="alert alert-success">{successMessage}</div>
  );

  return (
    <div className="container mt-3">
      {showSuccessMessage}

      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={profile.company_name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Company Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone_no">Phone Number</label>
          <input
            type="text"
            id="phone_no"
            name="phone_no"
            value={profile.phone_no}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Address"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default EditProfile1;
