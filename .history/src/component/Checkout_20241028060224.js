// src/App.js
import React, { useState } from 'react';
import './App.css';

const PlanInput = ({ onApply }) => {
  const [inputValue, setInputValue] = useState('');
  const [amountValue, setAmountValue] = useState('');

  const handleApply = () => {
    if (inputValue && amountValue) {
      onApply({ name: inputValue, amount: parseFloat(amountValue) });
      setInputValue('');
      setAmountValue('');
    }
  };

  return (
    <div className="plan-input">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter plan name"
        className="input-field"
      />
      <input
        type="number"
        value={amountValue}
        onChange={(e) => setAmountValue(e.target.value)}
        placeholder="Enter plan amount"
        className="input-field"
      />
      <button onClick={handleApply} className="apply-button">Apply</button>
    </div>
  );
};

const AppliedPlans = ({ plans, onDelete }) => {
  return (
    <div className="applied-plans">
      {plans.map((plan, index) => (
        <div key={index} className="plan-item">
          <span className="plan-name">{plan.name} - ${plan.amount.toFixed(2)}</span>
          <button onClick={() => onDelete(index)} className="delete-icon">🗑️</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [appliedPlans, setAppliedPlans] = useState([]);
  const [promoAmount, setPromoAmount] = useState('');

  const handleApply = (plan) => {
    setAppliedPlans([...appliedPlans, plan]);
  };

  const handleDelete = (index) => {
    setAppliedPlans(appliedPlans.filter((_, i) => i !== index));
  };

  const totalAmount = appliedPlans.reduce((total, plan) => total + plan.amount, 0);
  const discountAmount = parseFloat(promoAmount) || 0;
  const finalTotal = totalAmount - discountAmount;

  return (
    <div className="plan-manager">
      <h1>Apply for Plans</h1>
      <PlanInput onApply={handleApply} />

      <AppliedPlans plans={appliedPlans} onDelete={handleDelete} />

      <div className="promo-input">
        <input
          type="number"
          value={promoAmount}
          onChange={(e) => setPromoAmount(e.target.value)}
          placeholder="Enter promo amount"
          className="input-field"
        />
      </div>

      <div className="total">
        <h2>Total: ${finalTotal.toFixed(2)}</h2>
      </div>

      <div className="buttons">
        <button className="checkout-button">Submit</button>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
