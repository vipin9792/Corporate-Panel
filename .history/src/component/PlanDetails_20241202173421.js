import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlanDetails = () => {
  const { plan_ref, corp_id } = useParams(); // Get plan_ref and corp_id from the URL
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Use the Bearer Token here

  useEffect(() => {
    const fetchPlanDetails = async () => {
      setLoading(true);
      setError(null);

      // Log plan_ref and corp_id to ensure they are being passed correctly
      console.log("Plan Ref:", plan_ref); 
      console.log("Corp ID:", corp_id); 

      try {
        // Send the API request
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/subscription/fetchPlanDetails',
          { id_plan , corp_id }, // Send data to the API
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}` // Pass the Bearer Token in headers
            }
          }
        );

        console.log('API Response:', response.data);  // Log full response for debugging

        if (response.data.code === 1000) {
          setPlanData(response.data.plan); // Set plan data if response is successful
        } else {
          setError(response.data.status || 'Unknown error');
        }
      } catch (err) {
        setError('An error occurred while fetching the plan details.');
        console.error('Error fetching plan details:', err);  // Log the error
      } finally {
        setLoading(false);  // Set loading to false after the API request completes
      }
    };

    // Fetch the plan details if plan_ref and corp_id are available
    if (id_plan  && corp_id) {
      fetchPlanDetails();
    } else {
      setError("Missing plan_ref or corp_id.");
    }
  }, [id_plan , corp_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

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
