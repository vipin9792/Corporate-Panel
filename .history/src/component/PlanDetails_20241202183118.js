import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams(); // Get corp_id and id_plan from URL
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Use the Bearer Token here

  useEffect(() => {
    const fetchPlanDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Make the API request to fetch plan details based on corp_id and id_plan
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchPlanDetails",
          { corp_id, id_plan }, // Send corp_id and id_plan in the request body
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`, // Authorization header with Bearer token
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.code === 1000) {
          setPlanData(response.data.plan); // Set the plan data from the API response
        } else {
          setError(response.data.status || "Unknown error"); // Handle any other response error
        }
      } catch (err) {
        setError("An error occurred while fetching the plan details.");
        console.error(err);
      } finally {
        setLoading(false); // Set loading state to false after the request is completed
      }
    };

    if (corp_id && id_plan) {
      fetchPlanDetails(); // Fetch the plan details when corp_id and id_plan are available
    }
  }, [corp_id, id_plan]); // Run this effect when corp_id or id_plan changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {planData ? (
        <div>
          <h1>{planData.plan_name}</h1>
          <p>Cost: ${planData.total_cost}</p>
          <p>Discount: {planData.discount}%</p>
          <p>Storage: {planData.total_storage} GB</p>
          <p>Exams: {planData.no_of_exam}</p>

          <h2>Features:</h2>
          <ul>
            {planData.features.map((feature) => (
              <li key={feature.id_subscription}>
                {feature.subscription_display_name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No plan data available.</p>
      )}
    </div>
  );
};

export default PlanDetails;
