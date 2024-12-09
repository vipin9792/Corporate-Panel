import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerificationFlow = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); // Assuming the email is passed as props or set somehow
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For handling loading states
  const [otpSent, setOtpSent] = useState(false); // To track if OTP was sent

  const handleOtpChange = (e) => setOtp(e.target.value);

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const corp_id = localStorage.getItem('corp_id'); // Retrieve the corp_id from localStorage

    if (!corp_id) {
      setError('Corp ID is missing. Please try again.');
      return;
    }

    setLoading(true); // Set loading state true during API call

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

      setLoading(false); // Set loading state false after API call

      // Handle response
      if (response.data.code === 1000) {
        setMessage('Email verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/login');
      } else {
        setError(`OTP verification failed: ${response.data.status}`);
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      console.error('OTP Verification Error:', err);
      setError('An error occurred during OTP verification.');
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    const corp_id = localStorage.getItem('corp_id'); // Retrieve the corp_id from localStorage

    if (!corp_id) {
      setError('Corp ID is missing. Please try again.');
      return;
    }

    setLoading(true); // Set loading state true during API call

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resendOTP', // Resend OTP API endpoint
        { corp_id, email }, // Include corp_id and email
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      setLoading(false); // Set loading state false after API call

      // Handle response
      if (response.data.code === 1000) {
        setOtpSent(true); // Indicate that OTP was successfully sent
        setMessage('OTP has been sent to your email.');
        alert('OTP sent successfully. Please check your email.');
      } else {
        setError(`Failed to resend OTP: ${response.data.status}`);
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Resend OTP Error:', err);
      setError('An error occurred while resending OTP.');
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
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      {/* Resend OTP Button */}
      {!otpSent && (
        <button onClick={handleResendOtp} disabled={loading}>
          {loading ? 'Resending OTP...' : 'Resend OTP'}
        </button>
      )}

      {otpSent && <p>OTP has been sent to your email address. Please check your inbox.</p>}
    </div>
  );
};

export default EmailVerificationFlow;
