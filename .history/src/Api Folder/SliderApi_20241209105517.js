import axios from 'axios';

// Function to fetch carousel data
const fetchCarouselData = async () => {
  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Your token

  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/init/getPhotoSlider", // API endpoint
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    throw new Error("Error fetching carousel data");
  }
};

export default fetchCarouselData;
