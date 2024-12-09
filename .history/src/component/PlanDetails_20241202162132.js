import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlanDetails = () => {
  const { plan_ref, corp_id } = useParams(); // Get plan_ref and corp_id from the URL
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/subscription/fetchPlanDetails',
          { plan_ref, corp_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Ensure token is correct
              'API-Key': 'your-api-key' // If applicable, pass API key
            }
          }
        );

        console.log('API Response:', response.data);

        if (response.data.code === 1000) {
          setPlanData(response.data.plan);
        } else {
          setError(response.data.status || 'Unknown error');
        }
      } catch (err) {
        setError('An error occurred while fetching the plan details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (plan_ref && corp_id) {
      fetchPlanDetails();
    }
  }, [plan_ref, corp_id]);

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
            {planData.features.map(feature => (
              <li key={feature.id_subscription}>{feature.subscription_display_name}</li>
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
