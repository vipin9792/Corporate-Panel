import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword1 = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [corpId, setCorpId] = useState(null); // Store corpId here
  const navigate = useNavigate();

  const token = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/forgetPassword', 
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Forget Password API Response:', response);

      if (response.data.code === 1000) {
        setMessage('Please check your email for reset instructions.');
        setCorpId(response.data.corp_id); // Store the corp_id from the response
        // Redirect to reset password page with the token and corp_id
        setTimeout(() => {
          // navigate(`/ResetPassword1/${response.data.token}/${response.data.corp_id}`);
        }, 3000); // Wait for 3 seconds before redirecting
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
