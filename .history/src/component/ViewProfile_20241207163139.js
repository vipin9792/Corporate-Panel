import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // This will allow us to get the corp_id from URL params
import Footer from "./Footer"; // Assuming you have a Footer component for the page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Access the corp_id from the URL parameters

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data using corp_id when the component mounts or when corp_id changes
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile", // API endpoint
        { corp_id: corp_id }, // Send corp_id as part of the request body
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Make sure to use the correct token
          },
        }
      )
      .then((response) => {
        // Check if the API response is successful and contains profile data
        if (response.data.code === 1000) {
          setProfile(response.data.profile); // Set the profile data
          setError(""); // Clear any previous error messages
        } else {
          setError("Profile data not found"); // Set error if no profile data is found
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err); // Log any errors to the console
        setError("Error fetching profile data"); // Set error message if the request fails
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request completes
      });
  }, [corp_id]); // This will trigger the effect whenever corp_id changes

  // If the profile is still loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If there is an error, show the error message
  if (error) return <div>{error}</div>;

  // If profile data is loaded successfully, render the profile
  return (
    <div className="container mt-3">
      {profile && (
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
                  <h5 className="card-title">{profile.company_name || "No Company Name"}</h5>
                  <p className="card-text">
                    <strong>Email: </strong>
                    {profile.email || "No Email Provided"}
                  </p>
                  <p className="card-text">
                    <strong>Phone: </strong>
                    {profile.phone_no || "No Phone Provided"}
                  </p>
                  <p className="card-text">
                    <strong>Address: </strong>
                    {profile.address || "No Address Provided"}
                  </p>
                  <p className="card-text">
                    <strong>Username: </strong>
                    {profile.username || "No Username Provided"}
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
                    {profile.storage_used ? profile.storage_used : "No Data"} MB
                  </p>
                </div>
              </div>
            </div><br /><br /><br /><br /><br /><br /><br /><br />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ViewProfile;
