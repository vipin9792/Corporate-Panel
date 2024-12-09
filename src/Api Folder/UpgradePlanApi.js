// api.js

import axios from "axios";

// Base URL for the API
const API_URL = "http://103.35.121.219:4000/corp/subscription/fetchAllPlans";

// Function to fetch plans data from the API
export const fetchPlansData = async (corp_id) => {
  try {
    const response = await axios.post(
      API_URL,
      { corp_id: corp_id },
      {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
        },
      }
    );

    // Handle successful response
    if (response.data.code === 1000) {
      return response.data.plans; // Return the plans data
    } else {
      throw new Error("Failed to fetch plans data. Unexpected server status.");
    }
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};
