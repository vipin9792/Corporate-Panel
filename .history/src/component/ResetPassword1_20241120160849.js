import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword1 = () => {
  const { token } = useParams();  // Get token from URL (reset password token from URL)
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');  // State to hold OTP
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const corpId = 1; // You might need to fetch or set this from your context or state

  // Check if the token is present
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

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match!');
      return;
    }

    // Proceed with resetting the password using the API
    try {
      console.log('Submitting reset password request...');

      // Make the API call to reset the password
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/recovery/resetPassword',  // Reset password API
        {
          corp_id: corpId,  // Corp ID
          otp: otp,         // OTP entered by the user
          new_password: newPassword,  // New password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the Bearer token in the headers
          },
        }
      );

      console.log('Reset password API response:', response);

      // Handle response
      if (response.data.code === 1000) {
        setMessage('Password successfully reset!');
        alert('Password successfully reset!');
        console.log('Password reset success!');

        // Redirect to login after successful reset
        setTimeout(() => {
          navigate('/LoginForm');  // Replace with actual login page route
        }, 2000);
      } else {
        setError('Failed to reset password.');
        alert('Failed to reset password.');
        console.log('Failed to reset password:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while resetting the password.');
      alert('An error occurred during password reset!');
      console.log('Error details:', err);
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
            onChange={(e) => setOtp(e.target.value)}  // Capture OTP input
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
