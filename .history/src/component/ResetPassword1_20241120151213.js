import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  // Assuming the reset token will be passed in the URL as a parameter
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Both fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // API call for resetting the password
      const response = await axios.post(
        `http://103.35.121.219:4000/corp/resetPassword`,
        { newPassword, token }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token for verification
          },
        }
      );

      console.log('Reset Password API Response:', response);

      if (response.data.code === 1000) {
        setMessage('Password has been reset successfully!');
        
        // Redirect to login page after success
        setTimeout(() => {
          navigate('/Login'); // Redirect to login page
        }, 3000);
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error('Error in ResetPassword API:', err);
      setError('An error occurred while resetting your password.');
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Invalid or expired token.');
    }
  }, [token]);

  return (
    <div>
      <h2>Reset Password</h2>
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

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
