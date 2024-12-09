import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  // State hooks for managing data, loading, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://103.35.121.219:4000/init/getPhotoSlider'); // Example API endpoint
        setData(response.data);  // Set the data from the API response
        setLoading(false);  // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching data');  // Set an error message if something goes wrong
        setLoading(false);  // Set loading to false in case of an error
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Render loading, error, or data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Fetched Posts</h1>
      <ul>
        {data && data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SignUp;
