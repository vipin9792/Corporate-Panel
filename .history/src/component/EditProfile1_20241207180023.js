import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile1 = () => {
  const { corp_id } = useParams(); // Get the corp_id from the URL
  const navigate = useNavigate(); // For navigation after save
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
    // Fetch profile data on component mount
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
          const { company_name, email, phone_no, address, username } = response.data.profile;
          setProfile({
            company_name,
            email,
            phone: // Ensure correct mapping
            address,
            userid:  // Ensure correct mapping
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
    // Send the updated profile data to the server
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
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Replace with your token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          // Redirect to ViewProfile page after successful update
          navigate(`/viewProfile/${corp_id}`);
        } else {
          setError("Error updating profile");
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
