import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://103.35.121.219:4000/init/getPhotoSlider');
        setSliderImages(response.data.sliderImages);  // Assuming your API returns { sliderImages: [...] }
        setLoading(false);
      } catch (err) {
        setError('Error fetching photo slider');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Photo Slider</h2>
      <div>
        {sliderImages.map((image, index) => (
          <img key={index} src={image.url} alt={`Slider ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default SignUp;
