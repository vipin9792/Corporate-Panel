import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpgradePlan = () => {
  const { corp_id } = useParams(); // Extract corp_id from URL parameters
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  // State to hold plans data, loading state, and error state
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch subscription plans data from the API
  const fetchPlansData = async () => {
    setLoading(true);  // Set loading state to true
    setError(null);    // Reset error state

    try {
      // Make the API request to fetch the plans
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/subscription/fetchAllPlans',
        { corp_id: corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      // Log the full response for debugging
      console.log('API Response:', response.data);

      // Handle the successful response
      if (response.data.code === 1000) {
        setPlansData(response.data.plans);  // Store plans data in state
      } else {
        // Handle error if response status is not 1000
        setError('Failed to fetch plans data. Unexpected server status.');
      }
    } catch (error) {
      // Handle errors that occur during the API request
      console.error('Error fetching plans:', error);
      setError('Failed to fetch plans data. Please try again later.');
    } finally {
      setLoading(false);  // Set loading to false after the API request completes
    }
  };

  // Fetch the plans data when the component mounts or when corp_id changes
  useEffect(() => {
    fetchPlansData();
  }, [corp_id]);

  // Function to handle upgrading a plan
  const handleUpgrade = (id_plan , corp_id) => {
    // Log the plan_ref and corp_id for debugging
    console.log("Navigating with id_plan :", id_plan , "and corp_id:", corp_id);
  
    // Navigate to the PlanDetails page with both plan_ref and corp_id
    navigate(`/plan-details/${plan_ref}/${corp_id}`);
  };
  

  return (
    <div>
      <h1>Subscription Plans</h1>

      {loading && <p>Loading...</p>}  {/* Show loading message while fetching */}
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message if any error occurs */}

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
                <button
                  className="upgrade-button"
                  onClick={() => handleUpgrade(plan.plan_ref, corp_id)} // Pass both plan_ref and corp_id
                >
                  Upgrade to {plan.plan_name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plans available.</p>  // If no plans are available
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
