import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId');  // Extract corpId from URL params

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your actual token

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    setSuccessMessage('');
    setLoading(true);

    // Validate OTP length
    if (!otp || otp.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP',  // Make sure this is the correct API endpoint
        { otp, corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.status === 'Response successful complete!!') {
        setSuccessMessage('OTP verified successfully! You can now log in.');
      } else {
        setOtpError(response.data.status || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      setOtpError('An error occurred while verifying the OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Verifying OTP...' : 'Verify OTP'}
        </button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {otpError && <p style={{ color: 'red' }}>{otpError}</p>}
    </div>
  );
};

export default OtpVerify;
