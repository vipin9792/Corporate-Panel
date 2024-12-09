import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  // State hooks for managing the photo data, loading, and error
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Bearer token for authentication
  const bearerToken = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request with the Bearer Token in headers
        const response = await axios.get('http://103.35.121.219:4000/init/getPhotoSlider', {
          headers: {
            Authorization: `Bearer ${bearerToken}`, // Include Bearer Token in the headers
          },
        });

        // Check the response code
        if (response.data.code === 1000) {
          setPhotos(response.data.photos); // Set the photos data in state
        } else {
          setError('Error: Failed to fetch photos');
        }

        setLoading(false); // Set loading to false after the request completes
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render the photos
  return (
    <div>
      <h2>Photo Slider</h2>
      <div>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.photo_url} alt={photo.photo_text} width="300" height="200" />
              <p>{photo.photo_text}</p>
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
