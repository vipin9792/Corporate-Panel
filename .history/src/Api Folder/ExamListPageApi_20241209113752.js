import axios from "axios";

// Function to fetch exams data
export const fetchExams = async (corp_id) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/dashboard/examList",
      { corp_id },
      {
        headers: {
          Authorization:
            "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz", // Replace with actual token
        },
      }
    );

    return response.data;
  } catch (err) {
    throw new Error("Error fetching exams: " + err.message);
  }
};
