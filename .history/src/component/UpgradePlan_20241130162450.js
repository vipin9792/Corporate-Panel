import React, { useState, useEffect } from 'react';

const UpgradePlan = () => {
    const [plans, setPlans] = useState([]); // State to store the plans data
    const [loading, setLoading] = useState(true); // State to handle the loading state
    const [error, setError] = useState(null); // State to handle errors

    // Define your Bearer Token (This token should be securely stored)
    const BEARER_TOKEN = "YOUR_BEARER_TOKEN"; // Replace with the actual token

    // API Endpoint
    const apiUrl = 'https://your-api-endpoint.com/corp/subscription/fetchAllPlans'; // Replace with actual API endpoint

    // Fetch plans data from API on component mount
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST', // If you're making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${BEARER_TOKEN}`, // Adding the Bearer Token to the headers
                    },
                    body: JSON.stringify({
                        corp_id: 1, // Corp ID or any other necessary data
                    }),
                });

                // Check if response is ok
                if (!response.ok) {
                    const errorMessage = `HTTP error! Status: ${response.status}`;
                    console.error(errorMessage);
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                if (data.code === 1000) {
                    setPlans(data.plans); // Set the plans data into the state
                } else {
                    // Handle if the API returns an error code
                    setError('Error fetching plans: Invalid response code');
                }
            } catch (err) {
                console.error('Error during API request:', err);
                setError(`Error fetching plans: ${err.message}`);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchPlans();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // Function to render the plans dynamically
    const renderPlans = () => {
        return plans.map((plan) => (
            <div key={plan.id} className="plan">
                <h2>{plan.plan_name} Plan</h2>
                <p>
                    <strong>Cost:</strong> ${plan.total_cost} <br />
                    <strong>Discount:</strong> {plan.discount}% <br />
                    <strong>Time Limit:</strong> {plan.time_limt} minutes <br />
                    <strong>Total Storage:</strong> {plan.total_storage} GB <br />
                    <strong>No. of Exams:</strong> {plan.no_of_exam}
                </p>
                <h3>Features:</h3>
                <ul>
                    {plan.features.map((feature, index) => (
                        <li key={index}>{feature.subscription_display_name}</li>
                    ))}
                </ul>
            </div>
        ));
    };

    if (loading) {
        return <div>Loading plans...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Upgrade Your Plan</h1>
            <div className="plans-container">
                {renderPlans()}
            </div>
        </div>
    );
};

export default UpgradePlan;
