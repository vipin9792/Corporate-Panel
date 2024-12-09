import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewProfile = ({ corp_id }) => {
  const [profile, setProfile] = useState(null); // To store profile data
  const [error, setError] = useState(""); // To store any error message
  const [loading, setLoading] = useState(true); // To show loading status

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true); // Start loading
      try {
        // Send API request to fetch profile
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
          { corp_id: corp_id },
          {
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
            },
          }
        );

        // Check API response status
        if (response.data.code === 1000) {
          setProfile(response.data.profile); // Update profile data
          setError(""); // Clear any previous errors
        } else {
          setError("Failed to load profile. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err); // Debug error
        setError("An error occurred while fetching the profile.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProfileData();
  }, [corp_id]);

  return (
    <div className="container mt-3">
      {loading ? (
        <div>Loading profile...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div> // Display error message
      ) : (
        profile && (
          <div className="profile-details">
            <div className="row mb-4">
              <div className="col-lg-6">
                <h3>Profile Information</h3>
                <div className="card">
                  <img
                    src={profile.logo}
                    alt="Company Logo"
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{profile.company_name}</h5>
                    <p className="card-text">
                      <strong>Email: </strong>
                      {profile.email}
                    </p>
                    <p className="card-text">
                      <strong>Phone: </strong>
                      {profile.phone_no}
                    </p>
                    <p className="card-text">
                      <strong>Address: </strong>
                      {profile.address}
                    </p>
                    <p className="card-text">
                      <strong>Username: </strong>
                      {profile.username}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Storage Used</h5>
                    <p className="card-text">
                      <strong>Storage: </strong>
                      {profile.storage_used} MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ViewProfile;
