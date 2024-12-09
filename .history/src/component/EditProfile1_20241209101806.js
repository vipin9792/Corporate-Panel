import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile1 = () => {
  const { corp_id } = useParams(); // Get corp_id from URL params
  const navigate = useNavigate(); // For redirecting to ViewProfile
  const [profile, setProfile] = useState({
    company_name: "",
    email: "",
    phone: "",
    address: "",
    userid: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch profile data when the component mounts
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer <Your Token>`,
          },
        }
      )
      .then((response) => {
        console.log("Fetched Profile Data:", response.data);
        if (response.data.code === 1000) {
          const { company_name, email, phone_no, address, username } = response.data.profile;
          setProfile({
            company_name,
            email,
            phone: phone_no,
            address,
            userid: username,
          });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Updated profile data:", profile);

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
          navigate(`/viewProfile/${corp_id}`);
        } else {
          setError(`Error updating profile: ${response.data.message}`);
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setError("Error updating profile");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Profile</h1>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="company_name"
          value={profile.company_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userid"
          value={profile.userid}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfile1;
