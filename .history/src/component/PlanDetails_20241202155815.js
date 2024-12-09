import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlanDetails = () => {
  const { plan_ref } = useParams();  // Extract plan_ref from the URL
  const [planDetails, setPlanDetails] = useState(null);  // State to hold the fetched plan details
  const [loading, setLoading] = useState(true);  // Loading state to show a loading indicator
  const [error, setError] = useState(null);  // State to hold any error messages

  // Function to fetch plan details from the API
  const fetchPlanDetails = async () => {
    setLoading(true);  // Set loading to true when the fetch starts
    setError(null);    // Reset any previous errors

    try {
      // API request to fetch the details of the specific plan
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/subscription/fetchPlanDetails',
        { plan_ref: plan_ref },  // Pass the plan_ref to fetch details
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      // Log the full response for debugging
      console.log('API Response:', response.data);

      // Handle the successful response
      if (response.data.code === 1000) {
        // Successfully fetched the plan details
        setPlanDetails(response.data.plan);  // Store the plan details in state
        console.log('Plan details fetched successfully:', response.data.plan);
      } else {
        // If the code is not 1000, handle it as an error
        console.error('Error fetching plan details, status:', response.data.status);
        setError('Failed to fetch plan details. Unexpected server status.');
      }

    } catch (error) {
      // Catch any errors that happen during the request
      console.error('Error during fetch:', error);

      if (error.response) {
        // If the server responded with a non-2xx status code
        console.error('Server responded with status:', error.response.status);
        setError(`Failed to fetch plan details. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // If no response was received from the server
        console.error('No response received:', error.request);
        setError('Failed to fetch plan details. No response from server.');
      } else {
        // General error during the setup of the request
        console.error('Request setup error:', error.message);
        setError('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false); // End loading once the fetch is completed
    }
  };

  // Fetch the plan details when the component mounts
  useEffect(() => {
    if (!plan_ref) {
      alert('Plan ref is missing!');
      console.log('Error: plan_ref is undefined');
    } else {
      alert(`Fetching details for plan: ${plan_ref}`);
      console.log('Plan ref from URL:', plan_ref);
      fetchPlanDetails();  // Trigger the fetch function when the component loads
    }
  }, [plan_ref]);  // Dependency on plan_ref

  return (
    <div>
      <h1>Plan Details</h1>
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

      {planDetails && (
        <div>
          <h2>{planDetails.plan_name}</h2>
          <p>Total Cost: ${planDetails.total_cost}</p>
          <p>Discount: {planDetails.discount}%</p>
          <p>Storage: {planDetails.total_storage} GB</p>
          <p>Number of Exams: {planDetails.no_of_exam}</p>

          <h4>Features:</h4>
          <ul>
            {planDetails.features.map((feature) => (
              <li key={feature.id_subscription}>
                {feature.subscription_display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlanDetails;
