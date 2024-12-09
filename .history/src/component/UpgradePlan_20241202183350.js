import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpgradePlan = () => {
  const { corp_id } = useParams(); 
  const navigate = useNavigate(); 


  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchPlansData = async () => {
    setLoading(true); 
    setError(null); 

    try {
    
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/fetchAllPlans",
        { corp_id: corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );


      console.log("API Response:", response.data);

      if (response.data.code === 1000) {
        setPlansData(response.data.plans); 
      } else {
        
        setError("Failed to fetch plans data. Unexpected server status.");
      }
    } catch (error) {
      
      console.error("Error fetching plans:", error);
      setError("Failed to fetch plans data. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

 
  useEffect(() => {
    fetchPlansData();
  }, [corp_id]);

 
  const handleUpgrade = (id_plan, corp_id) => {
   
    console.log("Navigating with id_plan:", id_plan, "and corp_id:", corp_id);

   
    navigate(`/plan-details/${id_plan}/${corp_id}`);
  };

  return (
    <div>
      <h1>Subscription Plans</h1>
      {loading && <p>Loading...</p>} 
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      
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
                  onClick={() => handleUpgrade(plan.id, corp_id)} // Pass both id_plan and corp_id
                >
                  Upgrade to {plan.plan_name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plans available.</p> // If no plans are available
        )}
      </div>
    </div>
  );
};

export default UpgradePlan;
