import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpgradePlan = () => {
  const { plan_ref, corp_id } = useParams(); // Extract both plan_ref and corp_id from URL
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint/plan-details/${plan_ref}/${corp_id}`);
        const data = await response.json();
        if (data.code === 1000) {
          setPlanDetails(data.plan); // Update state with the plan data if response is successful
        } else {
          console.error('Error fetching plan details', data.status);
        }
      } catch (error) {
        console.error('Error fetching plan details:', error);
      }
    };

    if (plan_ref && corp_id) {
      fetchPlanDetails();
    }
  }, [plan_ref, corp_id]);

  return (
    <div>
      {planDetails ? (
        <div>
          <h1>{planDetails.plan_name} Details</h1>
          {/* Render plan details here */}
        </div>
      ) : (
        <p>Loading plan details...</p>
      )}
    </div>
  );
};

export default UpgradePlan;
