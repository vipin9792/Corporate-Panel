import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation to access URL query params
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee
} from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Access URL query parameters
  const queryParams = new URLSearchParams(location.search); // Parse query params
  const corpId = queryParams.get("corp_id"); // Get corp_id from query param

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  useEffect(() => {
    if (!corpId) {
      setError('No company ID found. Please log in again.');
      alert('No company ID found. Please log in again.'); // Alert for missing corp_id
      return;
    }

    // Fetch profile data from the API
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },  // Pass corp_id in the request body
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`, // Use the provided Bearer token here
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError('Error fetching profile data.');
          alert('Error fetching profile data.'); // Alert if there's an error fetching data
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
        alert('Error fetching profile data.');  // Alert on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId]); // Run when corpId changes

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something went wrong
  }

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      {/* Your component JSX code remains unchanged */}
      <Footer />
    </div>
  );
};

export default ViewProfile;
