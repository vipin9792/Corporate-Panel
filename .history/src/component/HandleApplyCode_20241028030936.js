import React, { useState } from 'react';
import './App.css'; // Ensure to create this CSS file with the styles below

const App = () => {
  const planAmount = 100; // Default plan amount
  const [promoCode, setPromoCode] = useState('');
  const [appliedCodes, setAppliedCodes] = useState([]);
  const [discount, setDiscount] = useState(0);

  const handleApplyCode = () => {
    if (promoCode.trim()) {
      if (promoCode === 'SAVE20') {
        if (!appliedCodes.includes(promoCode)) {
          setAppliedCodes([...appliedCodes, promoCode]);
          setDiscount(prevDiscount => prevDiscount + 20);
          alert('Promo code applied: $20 discount!');
        } else {
          alert('This promo code has already been applied.');
        }
      } else {
        alert('Invalid promo code.');
      }
      setPromoCode('');
    } else {
      alert('Please enter a promo code.');
    }
  };

  const handleRemoveCode = (code) => {
    setAppliedCodes(appliedCodes.filter(c => c !== code));
    // Adjust the discount if removing the specific code
    if (code === 'SAVE20') {
      setDiscount(prevDiscount => prevDiscount - 20);
    }
  };

  const finalAmount = Math.max(planAmount - discount, 0); // Ensure amount doesn't go negative

  return (
    <div className="container">
      <h1>Apply Promo Code</h1>
      <div className="promo-codes">
        {appliedCodes.map((code, index) => (
          <div key={index} className="promo-code">
            {code}
            <span className="delete-icon" onClick={() => handleRemoveCode(code)}>🗑️</span>
          </div>
        ))}
      </div>
      
      <div className="promo-container">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
        />
        <button onClick={handleApplyCode}>Apply</button>
      </div>

      <div className="total-amount">
        Total Amount: ${finalAmount}
      </div>

      <button className="checkout-button">Submit and Checkout</button>
    </div>
  );
};

export default Handle;
