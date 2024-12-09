import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    emailId: '',
    phoneNo: '',
    address: '',
    userid: '',
    passwd: '',
    name: '',
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
            Company Name:
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Email ID:
            <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Phone Number:
            <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            User ID:
            <input type="text" name="userid" value={formData.userid} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="passwd" value={formData.passwd} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
