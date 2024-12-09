import axios from "axios";

// Function to handle the login API call
const loginApi = async (values) => {
  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Your token

  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/login", // API endpoint
      values,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error("An error occurred during login.");
  }
};

export default loginApi;
