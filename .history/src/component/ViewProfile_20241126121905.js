import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
  const [profile, setProfile] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Retrieve corpId from query parameters (if available)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Parse query params from the URL
  const corpId = searchParams.get("corpId"); // Get corpId from URL query params

  useEffect(() => {
    if (corpId) {
      // If corpId is found, fetch profile data
      const fetchProfile = async () => {
        try {
          const response = await axios.post(
            `http://103.35.121.219:4000/corp/dashboard/fetchProfile/${corpId}`,
            {},
            {
              headers: {
                Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
              },
            }
          );
          setProfile(response.data); // Store the profile data
        } catch (error) {
          if (error.response) {
            setError(error.response.data.message || "Error fetching profile data");
          } else {
            setError("An unexpected error occurred");
          }
        } finally {
          setLoading(false); // Set loading to false after the request completes
        }
      };

      fetchProfile();
    } else {
      setError("No corpId provided or found"); // Error handling if no corpId is found
      setLoading(false); // Set loading to false in case of error
    }
  }, [corpId]); // Re-run effect if corpId changes

  // Handle loading, error, and profile data display
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile Details</h1>
      {profile ? (
        <div className="profile-details">
          <p><strong>Company Name:</strong> {profile.companyName}</p>
          <p><strong>Email:</strong> {profile.emailId}</p>
          <p><strong>Phone:</strong> {profile.phoneNo}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>User ID:</strong> {profile.userid}</p>
          <p><strong>Full Name:</strong> {profile.name}</p>
        </div>
      ) : (
        <div>No profile data found</div>
      )}
    </div>
  );
};

export default ViewProfile;
