import axios from 'axios';

const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

const API_URL = "http://103.35.121.219:4000/corp/subscription";

export const fetchPlanDetails = async (corp_id, id_plan) => {
  try {
    const response = await axios.post(
      `${API_URL}/fetchPlanDetails`,
      { corp_id, id_plan },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching plan details:", err);
    throw new Error("An error occurred while fetching the plan details.");
  }
};

export const buyPlan = async (corp_id, id_plan) => {
  try {
    const response = await axios.post(
      `${API_URL}/buyPlan`,
      { corp_id, id_plan },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error buying plan:", err);
    throw new Error("An error occurred while initiating the purchase.");
  }
};

export const updatePaymentStatus = async (corp_id, id_plan, id_payment, razorpay_payment_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/updatePayment`,
      {
        corp_id,
        id_plan,
        id_payment,
        razorpay_payment_id,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error updating payment status:", err);
    throw new Error("Error updating payment status.");
  }
};
