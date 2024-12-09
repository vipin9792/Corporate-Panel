import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory} from "react-router-dom"; // Added useHistory for navigation
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Get the corp_id from URL params
  const history = useHistory(); // Hook to handle navigation
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id: corp_id },
        {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`, // Replace with your actual token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  }, [corp_id]);

  const handleEditClick = () => {
    history.push(`/edit-profile/${corp_id}`); // Navigate to EditProfile component
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-3">
      <h3>View Profile</h3>
      {profile && (
        <div>
          <div className="profile-details">
            <p><strong>Company Name:</strong> {profile.company_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone_no}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>

          {/* Edit Button */}
          <button
            className="btn btn-primary"
            onClick={handleEditClick} // Trigger edit profile navigation
          >
            <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
          </button>
        </div>
      )}

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default ViewProfile;
