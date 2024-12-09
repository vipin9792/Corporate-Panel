import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiDataDisplay = () => {
  const [data, setData] = useState(null); // To hold the API data
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store any errors

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
        // Handle the error
        setLoading(false);
        if (err.response) {
          // If the response code indicates an error
          if (err.response.status === 404) {
            setError('Error: Endpoint not found (404). Please check the URL.');
          } else if (err.response.status === 401 || err.response.status === 403) {
            setError('Error: Authentication issue. Please check your API token.');
          } else if (err.response.data.code === 1003) {
            setError('Error: APP Token Mismatch or Broken. Please check your token.');
          } else {
            setError(`Error: ${err.response.status} - ${err.response.statusText}`);
          }
        } else if (err.request) {
          // No response was received
          setError('Error: No response from the server.');
        } else {
          // Error setting up the request
          setError(`Request setup error: ${err.message}`);
        }
      }
    };
    fetchData();
  }, []); // The empty dependency array ensures this runs only once after component mounts

  // While loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error, display it
  if (error) {
    return <div>{error}</div>;
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

export default ApiDataDisplay;
