import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword1 = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Assume the token is available (you might get it from localStorage or context)
  const token = 'YOUR_BEARER_TOKEN_HERE';  // Replace with your actual token

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      // API call for forget password
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/forgetPassword', // Your ForgetPassword API endpoint
        { email }, // Send the email as the body of the request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
          },
        }
      );

      // Handle the API response
      console.log('Forget Password API Response:', response);

      if (response.data.code === 1000) {
        setMessage('Please check your email for reset instructions.');
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error('Error in ForgetPassword API:', err);
      setError('An error occurred while processing your request.');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgetPassword1;
