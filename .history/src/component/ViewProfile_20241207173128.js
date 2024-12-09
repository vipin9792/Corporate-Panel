import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Get corp_id from URL params
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data using corp_id
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id }, // Send corp_id in the request body
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Add your authorization token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile); // Update profile state with the fetched data
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]); // Refetch data when corp_id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>View Profile</h3>
      <div className="profile-details">
        <div>
          <FontAwesomeIcon icon={faUserCircle} size="5x" />
        </div>
        <div>
          <p><strong>Company Name:</strong> {profile.company_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone_no}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Address:</strong> {profile.u}</p>
          <p><strong>Storage Used:</strong> {profile.storage_used}</p>
          <button
            onClick={() => navigate(`/EditProfile1/${corp_id}`)} // Navigate to Edit Profile page
            className="btn btn-primary"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
