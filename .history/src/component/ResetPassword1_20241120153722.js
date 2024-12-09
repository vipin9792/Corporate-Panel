import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Check if the token is present
  useEffect(() => {
    if (!token) {
      setError('Invalid or expired token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Proceed with resetting the password using the API
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/recovery/resetPassword', // Reset password API
        { token, newPassword }, // Send token and newPassword to the server
        {
          headers: {
            Authorization: `Bearer YOUR_BEARER_TOKEN`, // Replace with actual token
          },
        }
      );

      if (response.data.code === 1000) {
        setMessage('Password successfully reset!');
        // Redirect to login after successful reset
        setTimeout(() => {
          navigate('/login'); // Replace with the actual login page route
        }, 2000);
      } else {
        setError('Failed to reset password.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
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
