import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerificationFlow = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  // Check email and corp_id in localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedCorpId = localStorage.getItem('corp_id');

    console.log("Stored Email:", storedEmail);  // Debugging: Check the stored email
    console.log("Stored Corp ID:", storedCorpId);  // Debugging: Check the stored corp_id

    if (!storedEmail || !storedCorpId) {
      setError('Corp ID or Email is missing in localStorage. Please try again.');
      console.log("Error: Corp ID or Email is missing!");
    } else {
      console.log("Both Corp ID and Email are present.");
    }
  }, []);

  // Handle OTP input change
  const handleOtpChange = (e) => setOtp(e.target.value);

  // Handle Resend OTP functionality
  const handleResendOtp = async () => {
    setIsResending(true);

    const corp_id = localStorage.getItem('corp_id');
    const email = localStorage.getItem('email');

    console.log('Resend OTP - Corp ID:', corp_id);  // Debugging: Check corp_id before API call
    console.log('Resend OTP - Email:', email);  // Debugging: Check email before API call

    if (!corp_id || !email) {
      setError('Corp ID or Email is missing. Please try again.');
      setIsResending(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resendOTP', // API to resend OTP
        { corp_id, email },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      console.log('Resend OTP Response:', response);

      if (response.data.code === 1000) {
        setMessage('OTP has been resent successfully! Please check your email.');
        alert('OTP has been resent successfully. Please check your email.');
        navigate('/otp-verification');  // Redirect to OTP verification page
      } else {
        setError(`Resend OTP failed: ${response.data.status}`);
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      setError('An error occurred during OTP resend.');
    } finally {
      setIsResending(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const corp_id = localStorage.getItem('corp_id'); // Retrieve corp_id from localStorage
    const otpValue = otp;  // OTP entered by the user

    console.log('Verify OTP - Corp ID:', corp_id);  // Debugging: Check corp_id before API call
    console.log('Verify OTP - OTP:', otpValue);  // Debugging: Check OTP value before API call

    if (!corp_id || !otpValue) {
      setError('Corp ID or OTP is missing. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP', // API to verify OTP
        { corp_id, otp: otpValue }, // Send corp_id and otp to the API
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      if (response.data.code === 1000) {
        setMessage('Email verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/login');  // Redirect to login page
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

      {/* Form to verify OTP */}
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

      {/* Resend OTP button */}
      <button onClick={handleResendOtp} disabled={isResending}>
        {isResending ? 'Resending OTP...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default EmailVerificationFlow;
