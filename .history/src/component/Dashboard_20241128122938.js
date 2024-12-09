import React, { useEffect, useState } from "react";
import { useCorpId } from "./context/CorpIdContext"; // Import the context
import axios from "axios";

const Dashboard = () => {
  const { corpId } = useCorpId();  // Get corpId from context (or use localStorage)
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!corpId) {
        setError("No corp_id found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`);
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (err) {
        setError("Error fetching profile data.");
      }
    };

    fetchProfile();
  }, [corpId]);  // Ensure that the effect runs only when `corpId` is available

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
