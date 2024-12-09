import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerificationFlow = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isOtpResent, setIsOtpResent] = useState(false); // Track if OTP was resent

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

      // Log the response to check the data
      console.log('OTP Verification API Response:', response);

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

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resendOTP', // Resend OTP API endpoint
        { corp_id: 2, email }, // Pass corp_id and email to the API
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      // Log the response to check the data
      console.log('Resend OTP API Response:', response);

      if (response.data.code === 1000) {
        setIsOtpResent(true);
        setMessage('OTP has been resent to your email!');
      } else {
        setError('Failed to resend OTP. Please try again later.');
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      setError('An error occurred while resending the OTP.');
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleVerifyOtp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Verify OTP</button>
      </form>

      {/* Resend OTP Button */}
      <div>
        <button onClick={handleResendOtp} disabled={isOtpResent}>
          {isOtpResent ? 'OTP Resent' : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationFlow;
