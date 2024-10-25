import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBriefcase, faBuilding, faShieldAlt, faCrown } from '@fortawesome/free-solid-svg-icons';

const plansData = [
    {
        name: "Basic Plan",
        monthlyPrice: "$10/month",
        yearlyPrice: "$100/year",
        features: ["10 GB Storage", "Basic Support", "Access to Features"],
        icon: faUser,
        color: "linear-gradient(135deg, #6a11cb, #2575fc)"
    },
    {
        name: "Standard Plan",
        monthlyPrice: "$20/month",
        yearlyPrice: "$200/year",
        features: ["50 GB Storage", "Priority Support", "All Features Included"],
        icon: faUsers,
        color: "linear-gradient(135deg, #3a6073, #3a9475)"
    },
    {
        name: "Premium Plan",
        monthlyPrice: "$30/month",
        yearlyPrice: "$300/year",
        features: ["Unlimited Storage", "24/7 Support", "Advanced Features"],
        icon: faBriefcase,
        color: "linear-gradient(135deg, #ff7e5f, #feb47b)"
    },
    {
        name: "Business Plan",
        monthlyPrice: "$40/month",
        yearlyPrice: "$400/year",
        features: ["100 GB Storage", "Dedicated Support", "Custom Features"],
        icon: faBuilding,
        color: "linear-gradient(135deg, #00c6ff, #0072ff)"
    },
    {
        name: "Enterprise Plan",
        monthlyPrice: "$50/month",
        yearlyPrice: "$500/year",
        features: ["Unlimited Storage", "24/7 Premium Support", "Advanced Security Features"],
        icon: faShieldAlt,
        color: "linear-gradient(135deg, #f12711, #f5af19)"
    },
    {
        name: "Ultimate Plan",
        monthlyPrice: "$100/month",
        yearlyPrice: "$1000/year",
        features: ["Unlimited Storage", "24/7 Dedicated Support", "All Features Included"],
        icon: faCrown,
        color: "linear-gradient(135deg, #00b09b, #96c93d)"
    },
];

const UpgradePlans = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div>
            <div className="hero" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", color: "white", padding: "60px 0", textAlign: "center" }}>
                <h1 className="display-4">Choose Your Upgrade Plan</h1>
                <p className="lead">Find the perfect plan that fits your needs.</p>
            </div>

            <div className="container text-center my-4">
                <button className={`btn ${isYearly ? 'btn-outline-primary' : 'btn-primary'}`} onClick={() => setIsYearly(false)}>Monthly</button>
                <button className={`btn ${isYearly ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setIsYearly(true)}>Yearly</button>
            </div>

            <div className="container mt-5">
                <div className="row text-center">
                    {plansData.map(plan => (
                        <div className="col-md-4 mb-4" key={plan.name}>
                            <div className="card" style={{ background: plan.color, border: "none", color: "white", transition: "transform 0.3s, box-shadow 0.3s" }}>
                                <div className="card-header">
                                    <h3>{plan.name}</h3>
                                </div>
                                <div className="card-body">
                                    <div style={{ fontSize: "50px", marginBottom: "15px" }}>
                                        <FontAwesomeIcon icon={plan.icon} />
                                    </div>
                                    <h2 className="card-title">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</h2>
                                    <p className="card-text">Features:</p>
                                    <ul className="list-unstyled">
                                        {plan.features.map((feature, index) => (
                                            <li key={index}>✔ {feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="btn btn-light">Choose Plan</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpgradePlans;
