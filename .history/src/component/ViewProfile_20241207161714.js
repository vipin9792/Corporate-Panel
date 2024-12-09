import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewProfile = ({ corp_id }) => {
  const [profile, setProfile] = useState(null); // To store profile data
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        // Make API request to fetch profile data
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
          { corp_id: corp_id },
          {
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Ensure your token is correct
            },
          }
        );

        // If the API response code is 1000, update the profile state
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
          setError(""); // Clear any previous errors
        } else {
          setError("Failed to load profile. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err); // Log any errors
        setError("An error occurred while fetching the profile.");
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    // Fetch the profile when component is mounted or when corp_id changes
    fetchProfileData();
  }, [corp_id]);

  return (
    <div className="container mt-3">
      {loading ? (
        <div>Loading profile...</div> // Show loading message
      ) : error ? (
        <div className="alert alert-danger">{error}</div> // Show error message
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
