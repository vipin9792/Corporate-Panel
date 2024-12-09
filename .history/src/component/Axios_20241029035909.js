import React, { useState } from 'react';
import axios from 'axios';

const Axios = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debugging line
    console.log('Sending payload:', formData);
    try {
      const res = await axios.post('http://103.35.121.219:4000/corp/register', formData, {
        headers: {
          'Authorization': `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Replace with your actual token
        },
      });
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error('Error:', err); // More detailed error logging
      setError(err.response ? err.response.data : err.message);
      setResponse(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username" // Ensure this matches the API's expected field
          placeholder="Username"
          value={formData.username}
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

export default Axios;
