import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useCorp } from "../CorpContext";  // Using context to fetch corp_id

const ProfilePage = () => {
  const { corpId } = useCorp();  // Get corpId from context
  const navigate = useNavigate();
  
  // State to hold fetched profile data and error message
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Get `userid` from URL query or user input (assuming you have it in the URL or form)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userid = params.get("userid");  // Assuming userid is passed in the URL

  useEffect(() => {
    if (!corpId || !userid) {
      setError("Missing corp_id or userid");
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/profile?corpId=${corpId}&userid=${userid}`,
          {
            headers: {
              Authorization: `Bearer YOUR_BEARER_TOKEN`,
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId, userid]);  // Re-run the effect if corpId or userid changes

  return (
    <div>
      <h1>User Profile</h1>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {profileData && (
        <div>
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          {/* Render other profile data as needed */}
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
