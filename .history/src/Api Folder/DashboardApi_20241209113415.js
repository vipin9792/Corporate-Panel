// src/apiService.js
import axios from "axios";


const token = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

// Fetch dashboard details
export const fetchDashboardDetails = async (corp_id) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/dashboard/fetchDetail",
      { corp_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch subscription transactions
export const fetchSubscriptionTransactions = async (corp_id) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/subscription/fetchTransactions",
      { corp_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
