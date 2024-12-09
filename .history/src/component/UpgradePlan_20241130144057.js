import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpgradePlan = () => {
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch plans data
  






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
