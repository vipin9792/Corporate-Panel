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

      // Log the full API response for debugging
      console.log('API Response:', response.data);

      if (response.data.code === 1001) {
        // Handle the "Keys does not match !!" error
        console.error('Error: API keys do not match.');
        setError('Failed to fetch plans. API keys do not match. Please check your credentials.');
        return;
      }

      // Check if the response contains the expected data and status
      if (response.data && response.data.status === "Response successful complete!!") {
        setPlansData(response.data.plans); // Store the plans data in the state
        console.log("Plans fetched successfully:", response.data.plans);
      } else {
        console.error('Error fetching plans, status:', response.data.status);
        setError('Failed to fetch plans data. Unexpected server status.');
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
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Subscription Plans</h1>
      
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Display error message */}
      
      <div>
        {plansData.length > 0 ? (
          <div className="plans-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {plansData.map((plan) => (
              <div key={plan.id} style={{
                width: '300px', 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff'
              }}>
                <h3 style={{ textAlign: 'center', color: '#333' }}>{plan.plan_name}</h3>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Total Cost: <span style={{ color: '#4CAF50' }}>${plan.total_cost}</span></p>
                <p style={{ fontSize: '16px' }}>Discount: <span style={{ color: '#f44336' }}>{plan.discount}%</span></p>
                <p style={{ fontSize: '16px' }}>Storage: {plan.total_storage} GB</p>
                <p style={{ fontSize: '16px' }}>Number of Exams: {plan.no_of_exam}</p>

                <h4 style={{ marginTop: '15px' }}>Features:</h4>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature.id_subscription} style={{ fontSize: '14px' }}>
                      {feature.subscription_display_name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No plans available.</p> // If no plans found
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
