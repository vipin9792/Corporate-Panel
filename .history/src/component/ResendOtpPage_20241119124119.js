// ResendOtpPage.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResendOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {}; // Get email passed via navigation state
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP', // OTP verification API endpoint
        { email, otp },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      if (response.data.code === 1000) {
        setMessage('Email verified successfully! You can now log in.');
        navigate('/login'); // Redirect to login page after successful OTP verification
      } else {
        setError('Invalid OTP or email verification failed.');
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      setError('An error occurred during OTP verification.');
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
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

export default ResendOtpPage;
