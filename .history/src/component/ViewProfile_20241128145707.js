import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Use useParams to extract corp_id from the URL

const ViewProfile = () => {
  const { corp_id } = useParams(); // Extract corp_id from URL params
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Example: API call to fetch profile data using corp_id
    const fetchProfileData = async () => {
      const response = await fetch(`http://103.35.121.219:4000/corp/dashboard/fetchProfile/${corp_id}`); // Replace with actual API
      const data = await response.json();
      setProfileData(data);
    };

    if (corp_id) {
      fetchProfileData();
    }
  }, [corp_id]); // Re-fetch when corp_id changes

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile for Corp ID: {corp_id}</h1>
      <div>
        <h2>{profileData.name}</h2>
        <p>Email: {profileData.email}</p>
        <p>Role: {profileData.role}</p>
        {/* Add other profile fields */}
      </div>
    </div>
  );
};

export default ViewProfile;
