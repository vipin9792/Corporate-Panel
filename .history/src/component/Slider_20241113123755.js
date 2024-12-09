import React from 'react'

const Slider = () => {
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // State to hold carousel data
  const [carouselData, setCarouselData] = useState([]);




  // Fetch carousel data from API
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.post('http://103.35.121.219:4000/init/getPhotoSlider', {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });
        
        if (response.data.code === 1000) {
          setCarouselData(response.data.photos);
        } else {
          setError('Failed to fetch carousel data');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

  return (
    <div>
      
    </div>
  )
}

export default Slider
