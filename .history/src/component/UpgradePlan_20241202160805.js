import { useNavigate } from 'react-router-dom';

const UpgradePlan = () => {
  const navigate = useNavigate();
  const { corp_id } = useParams(); // Get corp_id from URL

  // Function to handle the upgrade action
  const handleUpgrade = (plan_ref) => {
    // Navigate to the PlanDetails component, passing both plan_ref and corp_id
    navigate(`/plan-details/${plan_ref}/${corp_id}`);
  };

  return (
    <div>
      {/* Assuming you're rendering the list of plans here */}
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
                onClick={() => handleUpgrade(plan.plan_ref)} // Trigger handleUpgrade on button click
              >
                Upgrade to {plan.plan_name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No plans available.</p> // If no plans found, show this message
      )}
    </div>
  );
};
