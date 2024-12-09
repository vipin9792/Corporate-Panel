import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';

const Axios = () => {
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

  // return (
  //   <div>
  //     <h2>Photo Slider</h2>
  //      <div>
  //       {photos.length > 0 ? (
  //         photos.map((photo) => (
  //           <div key={photo.id}>
  //              <img src={photo.photo_url} alt={photo.photo_text} width="300" height="200" /> 
  //             <p>{photo.photo_text}</p>
  //           </div>
  //         ))
  //       ) : (
  //         <p>No photos available</p>
  //       )}
  //     </div> 
  //   </div>
  // );




};

export default Axios;
