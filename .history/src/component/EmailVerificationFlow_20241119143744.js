import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerificationFlow = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleOtpChange = (e) => setOtp(e.target.value);

  // Function to verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const corp_id = localStorage.getItem('corp_id'); // Retrieve the corp_id from localStorage
    const otpValue = otp; // Ensure we have the otp value

    // Debugging: Log the retrieved values
    console.log('Corp ID:', corp_id);
    console.log('OTP:', otpValue);

    // Ensure both corp_id and otp are available before proceeding
    if (!corp_id || !otpValue) {
      setError('Corp ID or OTP is missing. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP', // OTP verification API endpoint
        { corp_id, otp: otpValue }, // Include corp_id and otp
        {
          headers: {
            Authorization: Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
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
        setError(OTP verification failed: ${response.data.status});
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      setError('An error occurred during OTP verification.');
    }
  };

  // Function to resend OTP
  const handleResendOtp = async () => {
    setIsResending(true);
    const corp_id = localStorage.getItem('corp_id');
    const email = localStorage.getItem('email');  // Ensure email is stored in localStorage

    // Debugging: Log the retrieved values
    console.log('Resend OTP - Corp ID:', corp_id);
    console.log('Resend OTP - Email:', email);

    // Ensure both corp_id and email are present before proceeding
    if (!corp_id || !email) {
      setError('Corp ID or email is missing. Please try again.');
      setIsResending(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resendOTP', // Resend OTP API endpoint
        { corp_id, email }, // Ensure the correct data is being passed
        {
          headers: {
            Authorization: Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
          }
        }
      );

      // Log the response and show an alert
      console.log('Resend OTP Response:', response);

      if (response.data.code === 1000) {
        setMessage('OTP has been resent successfully! Please check your email.');
        alert('OTP has been resent successfully. Please check your email.');
        navigate('/otp-verification'); // Redirect to OTP verification page
      } else {
        setError(Resend OTP failed: ${response.data.status});
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      setError('An error occurred during OTP resend.');
    } finally {
      setIsResending(false);
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

      <button onClick={handleResendOtp} disabled={isResending}>
        {isResending ? 'Resending OTP...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default EmailVerificationFlow; 