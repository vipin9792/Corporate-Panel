import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const UpgradePlan = () => {

    const { corp_id } = useParams();

    useEffect(() => {
      if (!corp_id) {
        alert("corp_id is missing from the URL!");
        console.log("Error: corp_id is undefined");
      } else {
        console.log("Corp ID from URL:", corp_id);
      }
    }, [corp_id]);
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
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz


` // Replace with your actual API key
        }
      });

      // Log the full API response for debugging
      console.log('API Response:', response.data);

      // Check for successful response and validate the data
      if (response.data.code === 1001) {
        console.error('Error: API keys do not match.');
        setError('Failed to fetch plans. API keys do not match. Please check your credentials.');
        return;
      }

      if (response.data && response.data.status === "Response successful complete!!") {
        setPlansData(response.data.plans); // Store the plans data in the state
        console.log("Plans fetched successfully:", response.data.plans);
      } else {
        console.error('Error fetching plans, status:', response.data.status);
        setError('Failed to fetch plans data. Unexpected server status.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);

      if (error.response) {
        // If the server responded with a status code other than 2xx
        setError(`Failed to fetch plans data. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // If no response was received
        setError('Failed to fetch plans data. No response from server.');
      } else {
        // General errors
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
          <div className="plans-container">
            {plansData.map((plans) => (
              <div key={plan.id} className="plan-card">
                <h3>{plan.plan_name}</h3>
                <p><strong>Total Cost:</strong> ${plans.total_cost}</p>
                <p><strong>Discount:</strong> {plan.discount}%</p>
                <p><strong>Time Limit:</strong> {plan.time_limt} minutes</p>
                <p><strong>Total Storage:</strong> {plan.total_storage} GB</p>
                <p><strong>Number of Exams:</strong> {plan.no_of_exam}</p>
                
                <h4>Features:</h4>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature.id_subscription}>
                      <strong>{feature.subscription_display_name}</strong> 
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No plans available.</p> // If no plans found
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
