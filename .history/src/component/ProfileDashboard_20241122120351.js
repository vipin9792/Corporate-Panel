import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'http://103.35.121.219:4000/corp/dashboard/fetchProfile';
      const token = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

      try {
        const response = await axios.post(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // If successful, store the data
        setData(response.data);
        setLoading(false);
      } catch (err) {
        // Handle any errors
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this will run once after the component mounts

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If data is available, display it
  return (
    <div>
      <h1>API Data</h1>
      <div className="data-container">
        {/* Display data dynamically */}
        {data && Object.keys(data).map((key) => (
          <div className="data-item" key={key}>
            <strong>{key}:</strong> {JSON.stringify(data[key])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDashboard;
