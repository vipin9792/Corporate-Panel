// Dashboard.js
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { corpId } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`);
        setProfile(response.data.profile);
      } catch (err) {
        setError("Error fetching profile data");
      }
    };

    fetchProfile();
  }, [corpId]);

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
