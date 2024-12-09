// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [appliedValues, setAppliedValues] = useState([]);

  const handleApply = () => {
    if (inputValue) {
      setAppliedValues([...appliedValues, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (index) => {
    setAppliedValues(appliedValues.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Apply for Plans</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter plan name"
      />
      <button onClick={handleApply}>Apply</button>

      <div className="applied-plans">
        {appliedValues.map((value, index) => (
          <div key={index} className="plan-item">
            <span>{value}</span>
            <button onClick={() => handleDelete(index)} className="delete-icon">🗑️</button>
          </div>
        ))}
      </div>

      {appliedValues.length > 0 && (
        <div className="checkout">
          <h2>Checkout</h2>
          <ul>
            {appliedValues.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default checkout;
