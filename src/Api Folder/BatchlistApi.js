import axios from "axios";

const API_URL = "http://103.35.121.219:4000/corp/dashboard/batchList";

// Function to fetch batches
export const fetchBatches = async (corp_id) => {
  try {
    const response = await axios.post(
      API_URL,
      { corp_id },
      {
        headers: {
          Authorization:
            "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz", // Replace with actual token
        },
      }
    );

    return response.data; // Return the response data to the caller
  } catch (err) {
    throw new Error(err.message); // Throw an error to be handled in the component
  }
};
