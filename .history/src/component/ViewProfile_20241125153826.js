import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Use query parameters if available, like 'corpId' and 'email'
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get("corpId");
  const email = queryParams.get("email");

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Replace with your actual token

  // Fetch profile data when component mounts or when corpId/email change
  useEffect(() => {
    if (!corpId || !email) {
      setError("Required query parameters (corpId or email) are missing.");
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/profile?corpId=${corpId}&email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.status === 200 && response.data.profile) {
          setProfileData(response.data.profile); // Assuming the profile is in 'profile' key
        } else {
          setError("Failed to fetch profile data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        if (error.response) {
          setError(error.response.data.message || "Error fetching profile data.");
        } else {
          setError("Network error or request issue.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId, email]); // Refetch data if 'corpId' or 'email' changes

  const handleEdit = () => {
    // Redirect to the edit profile page (example)
    navigate(`/edit-profile?corpId=${corpId}&email=${email}`);
  };

  return (
    <div>
      <section>
        <div className="row credential">
          <div className="col-lg-6">
            {loading && <div>Loading profile...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {profileData && (
              <div className="profile-details">
                <h2>Profile Information</h2>
                <div className="profile-item">
                  <strong>Company Name:</strong>
                  <p>{profileData.company_name}</p>
                </div>
                <div className="profile-item">
                  <strong>Email:</strong>
                  <p>{profileData.email_id}</p>
                </div>
                <div className="profile-item">
                  <strong>Phone Number:</strong>
                  <p>{profileData.phone_no}</p>
                </div>
                <div className="profile-item">
                  <strong>Address:</strong>
                  <p>{profileData.address}</p>
                </div>
                <div className="profile-item">
                  <strong>Full Name:</strong>
                  <p>{profileData.full_name}</p>
                </div>
                <button onClick={handleEdit} className="btn btn-warning">
                  Edit Profile
                </button>
              </div>
            )}
          </div>
          <div className="col-lg-6">
            <Slider /> {/* Assuming this component is a separate slider that you want to display */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProfile;
