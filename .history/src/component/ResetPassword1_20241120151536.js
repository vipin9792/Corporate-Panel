import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  // Get the token from the URL parameters (which is passed from the password reset link)
  const { token } = useParams();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both passwords match
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
        'http://103.35.121.219:4000/corp/recovery/resetPassword', // Reset password API endpoint
        { newPassword, token }, // Pass the new password and token
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Include the Bearer token
          },
        }
      );

      console.log('Reset Password API Response:', response);

      if (response.data.code === 1000) {
        setMessage('Password has been reset successfully!');
        
        // Redirect to login page after success
        setTimeout(() => {
          navigate('/Login'); // Redirect to the login page
        }, 3000);
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error('Error in ResetPassword API:', err);
      setError('An error occurred while resetting your password.');
    }
  };

  // Check if token is valid or expired
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

export default ResetPassword1;
