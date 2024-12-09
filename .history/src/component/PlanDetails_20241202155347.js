import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlanDetails = () => {
  const { plan_ref } = useParams(); // Get the plan_ref from the URL
  const [planData, setPlanData] = useState(null); // State to hold the plan details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch plan details based on plan_ref
  const fetchPlanDetails = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      // Send the request to fetch plan details
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/subscription/fetchPlanDetails', 
        { plan_ref: plan_ref },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );
  
      if (response.data.code === 1000) {
        setPlanData(response.data.plan); // Store the plan details in state
      } else {
        setError('Failed to fetch plan details.'); // Handle error if status code is not 1000
      }
    } catch (err) {
      console.error('Error fetching plan details:', err);
      setError('An error occurred while fetching plan details.');
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  // Fetch the plan details when the component mounts
  useEffect(() => {
    fetchPlanDetails(); // Trigger the fetch function
  }, [plan_ref]);

  // Display loading or error messages if needed
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Display the plan details if the data is available
  if (planData) {
    return (
      <div>
        <h1>{planData.plan_name} Plan Details</h1>
        <p><strong>Cost:</strong> ${planData.total_cost}</p>
        <p><strong>Discount:</strong> {planData.discount}%</p>
        <p><strong>Storage:</strong> {planData.total_storage} GB</p>
        <p><strong>Exams Allowed:</strong> {planData.no_of_exam}</p>
        <p><strong>Validity:</strong> {planData.time_limt} days</p>

        <h3>Features:</h3>
        <ul>
          {planData.features.map((feature) => (
            <li key={feature.id_subscription}>
              {feature.subscription_display_name}
            </li>
          ))}
        </ul>

        <button onClick={() => alert('Plan Upgraded!')}>Upgrade to {planData.plan_name}</button>
      </div>
    );
  }

  return null;
};

export default PlanDetails;
