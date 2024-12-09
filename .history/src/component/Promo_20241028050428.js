import React, { useState } from 'react';


const Promo = () => {
    const planAmount = 100; // Default plan amount
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoCodes, setPromoCodes] = useState([]);

    const applyPromoCode = () => {
        if (promoCode.trim()) {
            // Example: Apply a discount of $20 if promo code is "SAVE20"
            if (promoCode === 'SAVE20') {
                if (!promoCodes.includes(promoCode)) {
                    setPromoCodes([...promoCodes, promoCode]);
                    setDiscount(prevDiscount => prevDiscount + 20); // Add discount
                    alert('Promo code applied: $20 discount!');
                } else {
                    alert('Promo code already applied.');
                }
            } else {
                alert('Invalid promo code.');
            }
            setPromoCode(''); // Clear the input field
        } else {
            alert('Please enter a promo code.');
        }
    };

    const removePromoCode = (code) => {
        setPromoCodes(promoCodes.filter(promo => promo !== code));
        setDiscount(prevDiscount => prevDiscount - 20); // Deduct discount
    };

    const finalAmount = Math.max(planAmount - discount, 0); // Ensure amount doesn't go negative

    return (
        <div className="container">
           <button className='btn'></button>
            <div id="promo-codes">
                {promoCodes.length > 0 ? (
                    promoCodes.map((code, index) => (
                        <div key={index} className="promo-code">
                            {code}
                            <span 
                                className="delete-icon" 
                                onClick={() => removePromoCode(code)} 
                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                            >
                                🗑️
                            </span>
                        </div>
                    ))
                ) : (
                    <div>No promo codes applied.</div>
                )}
            </div>

            <div className="promo-container">
                <input 
                    type="text" 
                    value={promoCode} 
                    onChange={(e) => setPromoCode(e.target.value)} 
                    placeholder="Enter promo code" 
                />
                <button onClick={applyPromoCode}>Apply</button>
            </div>

            <div className="total-amount">
                Total Amount: $<span>{finalAmount}</span>
            </div>

            <button id="checkout-button">Submit and Checkout</button>
        </div>
    );
};

export default Promo;
