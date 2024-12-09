// api.js
import axios from "axios";

const BEARER_TOKEN =
  "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Use the Bearer Token here

export const fetchPlanDetails = async (corp_id, id_plan) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/subscription/fetchPlanDetails",
      { corp_id, id_plan },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    return response.data; // Returning response data
  } catch (err) {
    throw new Error("An error occurred while fetching the plan details.");
  }
};

export const buyPlan = async (corp_id, id_plan) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/subscription/buyPlan",
      { corp_id, id_plan },
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
      }
    );

    return response.data; // Returning response data
  } catch (err) {
    throw new Error("An error occurred while initiating the purchase.");
  }
};

export const updatePayment = async (corp_id, id_plan, paymentDetails) => {
  try {
    const response = await axios.post(
      "http://103.35.121.219:4000/corp/subscription/updatePayment",
      {
        corp_id,
        id_plan,
        id_payment: paymentDetails.id_payment,
        razorpay_payment_id: paymentDetails.razorpay_payment_id,
      },
      { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
    );

    return response.data; // Returning response data
  } catch (err) {
    throw new Error("Error updating payment status.");
  }
};
