import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const ResetPassword1 = () => {
  const { token } = useParams();  // Capture token from URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const corpId = 1;

  // Check if the token is available
  useEffect(() => {
    if (!token) {
      setError('Invalid or expired token.');
      alert('Token is missing or invalid!');
      console.log('No token found!');
    } else {
      console.log('Token received:', token);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/recovery/resetPassword',
        {
          corp_id: corpId,
          otp: otp,
          new_password: newPassword,
          token: token, // Send the token in the request
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        setMessage('Password successfully reset!');
        alert('Password successfully reset!');
        setTimeout(() => {
          navigate('/LoginForm'); // Redirect to login page after successful reset
        }, 2000);
      } else {
        setError('Failed to reset password.');
        alert('Failed to reset password.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while resetting the password.');
      alert('An error occurred during password reset!');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword1;
