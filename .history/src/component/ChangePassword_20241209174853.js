import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const { corp_id } = useParams();  // Get 'corp_id' from the URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using corp_id, e.g., to get the user's details
        const response = await fetch(`/api/user/${corp_id}`);
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [corp_id]);  // Refetch data if corp_id changes

  return (
    <div>
      <h1>Change Password for Corp ID: {corp_id}</h1>
      {loading && <p>Loading...</p>}
      {userData && (
        <div>
          {/* Display user data here */}
          <p>User Name: {userData.name}</p>
          {/* Add password change logic */}
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
