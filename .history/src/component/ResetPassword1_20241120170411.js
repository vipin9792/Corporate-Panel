import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword1 = () => {
  const { token } = useParams();  // Get the token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');  // State for OTP input
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const corpId = 1; // Corp ID (can be hardcoded or passed in from context)

  // The Bearer Token
  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Ensure the token is in the URL
  useEffect(() => {
    if (!token) {
      setError('Invalid or expired token.');
      alert('Token is missing or invalid!');
      console.log('No token found!');
    } else {
      console.log('Token received:', token); // Log token to ensure it's being received correctly
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match!');
      return;
    }

    // Log the Bearer Token used
    console.log("Bearer Token used for request:", BEARER_TOKEN);

    // Ensure that the OTP, newPassword, and token are all correct
    console.log("Sending API request with the following data:", {
      corp_id: corpId,
      otp: otp,
      new_password: newPassword,
      token: token  // Log the token being used
    });

    // Proceed with resetting the password using the API
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/recovery/resetPassword',  // Reset password API
        {
          corp_id: corpId,  // Corp ID (always 1 in this case)
          otp: otp,         // OTP entered by the user
          new_password: newPassword,  // New password
          token: token,     // The token retrieved from the URL
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,  // **Use the Bearer token in the Authorization header**
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
          navigate('/LoginForm');  // Redirect to login page
        }, 2000);
      } else {
        setError(`Failed to reset password: ${response.data.message || 'Unknown error'}`);
        alert(`Failed to reset password: ${response.data.message || 'Unknown error'}`);
        console.log('Failed to reset password:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(`An error occurred while resetting the password: ${err.message || 'Unknown error'}`);
      alert(`An error occurred: ${err.message || 'Unknown error'}`);
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
