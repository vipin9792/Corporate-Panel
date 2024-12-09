import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Access corp_id parameter from URL
  const navigate = useNavigate(); // For redirection to EditProfile1
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data using corp_id
    axios
    .post(
      "http://103.35.121.219:4000/corp/dashboard/updateProfile",
      {
        corp_id,
        company_name: profile.company_name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        userid: profile.userid,
      },
      {
        headers: {
          Authorization: `Bearer <Your Token>`,
        },
      }
    )
    .then((response) => {
      console.log("API Response on Save Changes:", response.data);
      if (response.data.code === 1000) {
        // Log the updated profile data after saving
        console.log("Updated Profile:", response.data.profile);
        navigate(`/viewProfile/${corp_id}`);
      } else {
        setError(`Error updating profile: ${response.data.message}`);
      }
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
      setError("Error updating profile");
    });
  




      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);

  const handleEdit = () => {
    console.log("Redirecting to EditProfile1"); // Debugging log
    navigate(`/EditProfile1/${corp_id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>View Profile</h1>
      {profile && (
        <div>
          <div>Company Name: {profile.company_name}</div>
          <div>Email: {profile.email}</div>
          <div>Phone: {profile.phone_no}</div>
          <div>Address: {profile.address}</div>
          <div>username: {profile.username}</div>
          <div>name: {profile.name}</div>
          <div>
            <img src={profile.logo} alt="Company Logo" />
          </div>
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ViewProfile;
