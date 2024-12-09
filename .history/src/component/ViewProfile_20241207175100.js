import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Get the corp_id from the URL
  const navigate = useNavigate(); // For navigation to EditProfile
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Replace with your token
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
        setLoading(false);
      });
  }, [corp_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>View Profile</h1>
      <div>
        <p>Company Name: {profile.company_name}</p>
        <p>Email: {profile.email}</p>
        <p>Phone: {profile.phone_no}</p>
        <p>Address: {profile.address}</p>
        <p>User ID: {profile.username}</p>
        <button onClick={() => navigate(`/EditProfile1/${corp_id}`)}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
