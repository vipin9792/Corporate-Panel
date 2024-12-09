import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword1 = () => {
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
      console.log('Passwords do not match:', newPassword, confirmPassword);
      return;
    }

    // Proceed with resetting the password using the API
    try {
      console.log('Submitting reset password request...');
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/recovery/resetPassword', // Reset password API
        { token, newPassword }, // Send token and newPassword to the server
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Replace with actual token
          },
        }
      );

      console.log('Reset password API response:', response);

      if (response.data.code === 1000) {
        setMessage('Password successfully reset!');
        alert('Password successfully reset!');
        console.log('Password reset success!');
        
        // Redirect to login after successful reset
        setTimeout(() => {
          navigate('/login'); // Replace with the actual login page route
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
