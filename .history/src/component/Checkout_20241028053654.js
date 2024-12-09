// src/App.js
import React, { useState } from 'react';
import './App.css';

const Checkout  = ({ onApply }) => {
  const [inputValue, setInputValue] = useState('');

  const handleApply = () => {
    if (inputValue) {
      onApply(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="plan-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter plan name"
      />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

const AppliedPlans = ({ plans, onDelete }) => {
  return (
    <div className="applied-plans">
      {plans.map((plan, index) => (
        <div key={index} className="plan-item">
          <span>{plan}</span>
          <button onClick={() => onDelete(index)} className="delete-icon">🗑️</button>
        </div>
      ))}
    </div>
  );
};

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
