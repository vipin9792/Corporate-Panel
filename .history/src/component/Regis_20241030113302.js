import React, { useState } from 'react';
import axios from 'axios';

const Regis = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post('http://103.35.121.219:4000/corp/register', formData, {
        headers: {
          Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'
        }
      });
      setSuccessMessage('Signup successful!');
      console.log(response.data);
    } catch (err) {
      const message = err.response ? err.response.data.message : 'Signup failed. Please try again.';
      setError(message);
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Regis;
