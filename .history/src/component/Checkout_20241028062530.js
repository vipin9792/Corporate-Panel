
import React, { useState } from 'react';


const PlanInput = ({ onApply }) => {
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
          <span className="plan-name">{plan}</span>
          <button onClick={() => onDelete(index)} className="delete-icon">🗑️</button>
        </div>
      ))}
    </div>
  );
};

const Checkout = () => {
  const [appliedPlans, setAppliedPlans] = useState([]);

  const handleApply = (plan) => {
    setAppliedPlans([...appliedPlans, plan]);
  };

  const handleDelete = (index) => {
    setAppliedPlans(appliedPlans.filter((_, i) => i !== index));
  };

  return (
    <div className="plan-manager">
        <div style={{marginLeft:"-263px"}}>
     <button className='btn btn-primary' >Promo</button>
     <p> <strong className=' text-danger fs-3'>$2500</strong></p>
     </div>
      <PlanInput onApply={handleApply} />
      
      <AppliedPlans plans={appliedPlans} onDelete={handleDelete} />

      {appliedPlans.length > 0 && (
        <div className="checkout">
                 
          <h2>Checkout</h2>
          <ul>
            {appliedPlans.map((plan, index) => (
              <li key={index} className="checkout-item">{plan}</li>
            ))}
          </ul>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
      <p style={{marginLeft:"-223px"}}><strong >Total Price:</strong> $99</p>
      <button className='btn btn-primary'> Submit An</button>
    </div>
  );
};

export default Checkout;