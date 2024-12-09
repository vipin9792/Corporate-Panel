import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerToken = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.post('http://103.35.121.219:4000/init/getPhotoSlider', {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (response.data.code === 1000) {
          setPhotos(response.data.photos);
        } else {
          setError('Error: Failed to fetch photos');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 







  
};

export default SignUp;
