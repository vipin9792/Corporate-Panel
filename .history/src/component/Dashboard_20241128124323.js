import React, { useEffect, useState } from "react";
import { useCorpId } from "../CorpIdContext"; // Import the context
import axios from "axios";

const Dashboard = () => {
  const { corpId } = useCorpId(); // Get corpId from context (or use localStorage)
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!corpId) {
        setError("No corp_id found. Please log in.");
        return;
      }

      try {
        // Use GET request instead of POST for the profile endpoint
        const response = await axios.(`http://103.35.121.219:4000/corp/dashboard/fetchProfile`, {
          params: { corp_id: corpId }, // Sending corp_id as query param
        });

        if (response.status === 200 && response.data.code === 1000) {
          setProfile(response.data.profile); // Store profile data
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (err) {
        setError("Error fetching profile data.");
      }
    };

    fetchProfile();
  }, [corpId]); // Run effect when corpId changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Company Name: {profile.company_name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone No: {profile.phone_no}</p>
      <p>Address: {profile.address}</p>
      {/* Render other profile details */}
    </div>
  );
};

export default Dashboard;
