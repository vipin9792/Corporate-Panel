// src/App.js
import React, { useState } from 'react';
import PlanInput from './PlanInput';
import AppliedPlans from './AppliedPlans';
import './App.css';

const App = () => {
  const [appliedPlans, setAppliedPlans] = useState([]);

  const handleApply = (plan) => {
    setAppliedPlans([...appliedPlans, plan]);
  };

  const handleDelete = (index) => {
    setAppliedPlans(appliedPlans.filter((_, i) => i !== index));
  };

  return (
    <div className="plan-manager">
      <h1>Apply for Plans</h1>
      <PlanInput onApply={handleApply} />
      
      <AppliedPlans plans={appliedPlans} onDelete={handleDelete} />

      {appliedPlans.length > 0 && (
        <div className="checkout">
          <h2>Checkout</h2>
          <ul>
            {appliedPlans.map((plan, index) => (
              <li key={index}>{plan}</li>
            ))}
          </ul>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
