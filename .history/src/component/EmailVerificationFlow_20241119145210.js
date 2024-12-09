import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerificationFlow = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const corp_id = localStorage.getItem('corp_id'); // Retrieve the corp_id from localStorage

    if (!corp_id) {
      setError('Corp ID is missing. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP', // OTP verification API endpoint
        { corp_id, email, otp }, // Include corp_id, email, and otp
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      // Log the response and show an alert
      console.log('OTP Verification Response:', response);
      
      if (response.data.code === 1000) {
        setMessage('Email verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/login');
      } else {
        setError(`OTP verification failed: ${response.data.status}`);
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      setError('An error occurred during OTP verification.');
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default EmailVerificationFlow;
