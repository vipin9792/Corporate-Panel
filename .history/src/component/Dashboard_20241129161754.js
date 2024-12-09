import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { corp_id } = useParams(); // Get dynamic corp_id from URL
  const [corpData, setCorpData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch corp data when component mounts
    axios.post(`http://103.35.121.219:4000/corp/dashboard/fetchCorpData/${corp_id}`, {
      // You can include additional body data here if needed
    })
      .then(response => {
        setCorpData(response.data);
      })
      .catch(error => {
        console.error("Error fetching corp data:", error);
        setError("Failed to fetch data");
      });
  }, [corp_id]); // Re-run effect when corp_id changes

  if (error) return <div>{error}</div>;
  if (!corpData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{corpData.company_name}</h1>
      <p>Email: {corpData.email}</p>
      <p>Phone: {corpData.phone}</p>
      <p>Address: {corpData.address}</p>
    </div>
  );
};

export default Dashboard;
