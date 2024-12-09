
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
        placeholder=""
        className="input-field"
      />
      <button onClick={handleApply} className="apply-button ">Apply</button>
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
        <div >
     <button className='btn btn-primary' style={{marginLeft:"-13px"}}>Business Plan</button>
     <p> <strong className=' text-danger fs-3' style={{marginLeft:"-173px"}}>$2500</strong>/month</p>
     <p className='text-primary' style={{marginBottom:"4px",marginLeft:"-172px"}}>Promo Code</p>
     </div>
      <PlanInput onApply={handleApply} />
      
      <AppliedPlans plans={appliedPlans} onDelete={handleDelete} />

      {appliedPlans.length > 0 && (
        <div className="checkout">
                 
          
        </div>
      )}
      <p style={{marginLeft:"-333px"}}><strong >Total Price:</strong> $99</p>
      <button className='btn btn-primary'> Submit And CheckOut</button>
    </div>
  );
};

export default Checkout;