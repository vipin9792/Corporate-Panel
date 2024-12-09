import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEdit } from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Access the corp_id from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the profile data using corp_id
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

  const handleEditClick = () => {
    // Navigate to the Edit Profile page with the corp_id
    navigate(`/EditProfile/${corp_id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-3">
      <h3>View Profile</h3>

      {profile && (
        <div>
          <div className="profile-details">
            <img
              src={profile.logo}
              alt="Profile Logo"
              style={{ width: "100px", height: "100px" }}
            />
            <h4>{profile.company_name}</h4>
            <p><strong>Email: </strong>{profile.email}</p>
            <p><strong>Phone: </strong>{profile.phone_no}</p>
            <p><strong>Address: </strong>{profile.address}</p>
            <p><strong>Storage Used: </strong>{profile.storage_used} MB</p>
            <p><strong>Verified: </strong>{profile.verify_status === 1 ? "Yes" : "No"}</p>

            <button onClick={handleEditClick} className="btn btn-primary">
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </button>
          </div>
        </div>
      )}

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default ViewProfile;
