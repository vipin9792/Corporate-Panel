import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify'; // Import toast

import 'react-toastify/dist/ReactToastify.css'; // Import CSS

import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const EditProfile1 = () => {
  const { corp_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
    address: "",
    userid: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        {
          corp_id: corp_id,
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          const { company_name, email, phone_no, address, username } =
            response.data.profile;
          setFormData({
            company_name,
            email,
            phone: phone_no,
            address,
            userid: username,
          });
        } else {
          setError("Failed to fetch profile data");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", formData);

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/dashboard/updateProfile",
        {
          corp_id: corp_id,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          userid: formData.userid,
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        // Debugging: Check if toast.success is triggered
        console.log("Success response received");
        toast.success("Profile updated successfully!");
        navigate(`/ViewProfile/${corp_id}`);
      } else {
        setError("Failed to update profile. Please try again.");
        // Debugging: Check if toast.error is triggered
        console.log("Failed to update profile");
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while saving changes");
      // Debugging: Check if toast.error is triggered
      console.log("Error occurred while saving changes");
      toast.error("An error occurred while saving changes");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <button type="submit">Save Changes</button>
      </form>
      <Footer />
      
      {/* Toast container to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default EditProfile1;
