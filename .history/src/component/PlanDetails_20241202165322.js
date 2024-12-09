import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlanDetails = () => {
  const { plan_ref, corp_id } = useParams(); // Access plan_ref and corp_id from the URL
  const [planDetails, setPlanDetails] = useState(null);

  // Log the plan_ref and corp_id to the console
  useEffect(() => {
    console.log("Plan ref from URL:", plan_ref);  // Check if plan_ref is passed correctly
    console.log("Corp ID from URL:", corp_id);    // Check if corp_id is passed correctly
  }, [plan_ref, corp_id]);  // Only run when plan_ref or corp_id change

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint/plan-details/${plan_ref}/${corp_id}`);
        const data = await response.json();
        if (data.code === 1000) {
          setPlanDetails(data.plan);  // Update the state with the fetched plan details
        } else {
          console.error('Error fetching plan details', data.status);
        }
      } catch (error) {
        console.error('Error fetching plan details:', error);
      }
    };

    if (plan_ref && corp_id) {
      fetchPlanDetails();  // Fetch plan details when both plan_ref and corp_id are available
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

export default PlanDetails;
