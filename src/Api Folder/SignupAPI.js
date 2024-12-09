import axios from "axios";

const SignupAPI = async (values, BEARER_TOKEN) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/register",
      values,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "An error occurred during signup.");
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

export default SignupAPI;
