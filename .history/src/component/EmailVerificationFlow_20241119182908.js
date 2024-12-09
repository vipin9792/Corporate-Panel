import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EmailVerificationFlow = () => {
  const [corpId, setCorpId] = useState(null);
  const [email, setEmail] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    // Retrieve query params from the URL
    const queryParams = new URLSearchParams(location.search);
    const registeredCorpId = queryParams.get('corpId');
    const registeredEmail = queryParams.get('email');

    console.log('corpId from query params:', registeredCorpId); // Debugging log
    console.log('Email from query params:', registeredEmail); // Debugging log

    if (registeredCorpId) {
      setCorpId(registeredCorpId);
    } else {
      console.warn('corpId is missing from the URL.');
    }

    if (registeredEmail) {
      setEmail(registeredEmail);
    } else {
      console.warn('Email is missing from the URL.');
      setEmail('No email provided');  // Optional fallback for email if not found
    }
  }, [location.search]);

  return (
    <div>
      <h3>Verify OTP</h3>
      <p>Corp ID: {corpId}</p>
      <p>Email: {email}</p>

      {/* Add your OTP verification UI here */}
    </div>
  );
};

export default EmailVerificationFlow;
