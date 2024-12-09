import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpgradePlan = () => {
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch plans data
  const fetchPlansData = async () => {
    setLoading(true); // Start loading
    setError(null);   // Reset error before making the request
    
    try {
      const response = await axios.post('http://103.35.121.219:4000/corp/subscription/fetchAllPlans', {}, {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
        }
      });

      // Log the API response for debugging
      console.log('API Response:', response.data);

      // Check if the response contains the expected data and status
      if (response.data && response.data.status === "Response successful complete!!") {
        setPlansData(response.data.plans); // Store the plans data in the state
        console.log("Plans fetched successfully:", response.data.plans);
      } else {
        console.error('Error fetching plans, status:', response.data.status);
        alert('Failed to fetch plans data. Server returned an unexpected status.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);

      // Handle specific error cases
      if (error.response) {
        // If the server responded with a status code other than 2xx
        console.error('Server responded with status:', error.response.status);
        setError(`Failed to fetch plans data. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // If no response was received
        console.error('No response received:', error.request);
        setError('Failed to fetch plans data. No response from server.');
      } else {
        // General errors
        console.error('Request setup error:', error.message);
        setError('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };






  

  // Fetch plans data when the component mounts
  useEffect(() => {
    fetchPlansData();
  }, []); // Empty array means this runs once when the component mounts

  return (
    <div>
      <h1>Subscription Plans</h1>
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <div>
        <h2>Available Plans</h2>
        {plansData.length > 0 ? (
          <ul>
            {plansData.map((plan) => (
              <li key={plan.id}>
                <h3>{plan.plan_name}</h3>
                <p>Total Cost: ${plan.total_cost}</p>
                <p>Discount: {plan.discount}%</p>
                <p>Storage: {plan.total_storage} GB</p>
                <p>Number of Exams: {plan.no_of_exam}</p>
                <h4>Features:</h4>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature.id_subscription}>
                      {feature.subscription_display_name}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plans available.</p> // If no plans found
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
