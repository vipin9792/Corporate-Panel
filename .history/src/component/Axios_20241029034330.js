// src/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://103.35.121.219:4000/corp/register', formData, {
        headers: {
          'Authorization': `Bearer YOUR_APP_TOKEN`, // Replace with your actual token
        },
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      setResponse(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PostForm;
