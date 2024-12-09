import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpgradePlan = () => {
  const [plansData, setPlansData] = useState([]); // State to hold the fetched plans data
  const [loading, setLoading] = useState(false); // Loading state to show a loading indicator
  const [error, setError] = useState(null); // State to hold any error messages

  // Function to fetch subscription plans data from the API
  const fetchPlansData = async () => {
    setLoading(true);  // Set loading to true when the fetch starts
    setError(null);    // Reset any previous errors
  
    try {
      // API request to fetch subscription plans data
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/subscription/fetchAllPlans', 
        { corp_id: 1 },  // Assuming corp_id is needed in the request body
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
        // Successfully fetched the plans
        setPlansData(response.data.plans); // Store the plans in state
        console.log("Plans fetched successfully:", response.data.plans);
      } else {
        // If the code is not 1000, handle it as an error
        console.error('Error fetching plans, status:', response.data.status);
        setError('Failed to fetch plans data. Unexpected server status.');
      }
  
    } catch (error) {
      // Catch any errors that happen during the request
      console.error('Error during fetch:', error);
  
      if (error.response) {
        // If the server responded with a non-2xx status code
        console.error('Server responded with status:', error.response.status);
        setError(`Failed to fetch plans data. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // If no response was received from the server
        console.error('No response received:', error.request);
        setError('Failed to fetch plans data. No response from server.');
      } else {
        // General error during the setup of the request
        console.error('Request setup error:', error.message);
        setError('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false); // End loading once the fetch is completed
    }
  };
  


  // Fetch the plans data when the component mounts
  useEffect(() => {
    fetchPlansData(); // Trigger the fetch function when the component loads
  }, []); // Empty dependency array means it will run once when the component mounts

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

                {/* Button to upgrade the plan */}
                <a href={`/upgrade/${plan.plan_ref}`}>
                  <button className="upgrade-button">
                    Upgrade to {plan.plan_name}
                  </button>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plans available.</p> // If no plans found, show this message
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
