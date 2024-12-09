import React, { useState, useEffect } from 'react';

const UpgradePlan = () => {
    const [plans, setPlans] = useState([]);  // To store the plans data
    const [loading, setLoading] = useState(true);  // To handle the loading state

    // Sample API Response, this would usually be fetched from an API
    const apiResponse = {
        "code": 1000,
        "status": "Response successful complete!!",
        "plans": [
            {
                "id": 1,
                "plan_ref": "d93120fe-58f2-4aa6-9de2-e48c16fc341b",
                "plan_name": "Gold",
                "total_cost": 100,
                "discount": 5,
                "time_limt": 120,
                "total_storage": 50,
                "no_of_exam": 1000,
                "features": [
                    { "subscription_display_name": "Theory Examination" },
                    { "subscription_display_name": "Viva Examination" },
                    { "subscription_display_name": "Subjective Examination" },
                    { "subscription_display_name": "Video Practical OR Interview" },
                    { "subscription_display_name": "Live Video Proctoring" },
                    { "subscription_display_name": "Chat with Candidate" },
                    { "subscription_display_name": "Aadhaar Validation via OTP" },
                    { "subscription_display_name": "Question Bank Management" },
                    { "subscription_display_name": "Candidate Management" },
                    { "subscription_display_name": "Batch Management" },
                    { "subscription_display_name": "Exam Preparation and Scheduling" },
                    { "subscription_display_name": "Facial Recognition" },
                    { "subscription_display_name": "Capture Profile Photo" },
                    { "subscription_display_name": "Capture ID Photo" },
                    { "subscription_display_name": "Assessment Analysis" },
                    { "subscription_display_name": "Result Report" },
                    { "subscription_display_name": "Language Translation" },
                    { "subscription_display_name": "Feedback Management" },
                    { "subscription_display_name": "Certificate Management" },
                    { "subscription_display_name": "Screen Recording" },
                    { "subscription_display_name": "Object detection" },
                    { "subscription_display_name": "Descriptive Auto Marking" }
                ]
            },
            {
                "id": 7,
                "plan_ref": "aaf1cdba-202e-43cb-99ea-33a5be49f477",
                "plan_name": "Platinum",
                "total_cost": 20,
                "discount": 1,
                "time_limt": 30,
                "total_storage": 20,
                "no_of_exam": 10,
                "features": [
                    { "subscription_display_name": "Theory Examination" },
                    { "subscription_display_name": "Viva Examination" },
                    { "subscription_display_name": "Subjective Examination" },
                    { "subscription_display_name": "Video Practical OR Interview" },
                    { "subscription_display_name": "Live Video Proctoring" },
                    { "subscription_display_name": "Chat with Candidate" },
                    { "subscription_display_name": "Aadhaar Validation via OTP" },
                    { "subscription_display_name": "Question Bank Management" },
                    { "subscription_display_name": "Candidate Management" },
                    { "subscription_display_name": "Batch Management" },
                    { "subscription_display_name": "Exam Preparation and Scheduling" },
                    { "subscription_display_name": "Facial Recognition" },
                    { "subscription_display_name": "Capture Profile Photo" },
                    { "subscription_display_name": "Capture ID Photo" },
                    { "subscription_display_name": "Assessment Analysis" },
                    { "subscription_display_name": "Result Report" },
                    { "subscription_display_name": "Language Translation" },
                    { "subscription_display_name": "Feedback Management" },
                    { "subscription_display_name": "Certificate Management" },
                    { "subscription_display_name": "Screen Recording" },
                    { "subscription_display_name": "Object detection" },
                    { "subscription_display_name": "Descriptive Auto Marking" }
                ]
            }
        ]
    };

    // Simulating API Call with useEffect (you can replace this with an actual API call)
    useEffect(() => {
        setTimeout(() => {
            setPlans(apiResponse.plans);  // Set the plans data
            setLoading(false);  // Set loading to false once data is fetched
        }, 1000);  // Simulating an API delay
    }, []);

    // Function to render the plans
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

    // Render loading message if the data is still being fetched
    if (loading) {
        return <div>Loading plans...</div>;
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
