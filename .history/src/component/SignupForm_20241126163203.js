import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone_no: '',
    address: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formDataObj = new FormData();
    formDataObj.append('company_name', formData.company_name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone_no', formData.phone_no);
    formDataObj.append('address', formData.address);
    formDataObj.append('username', formData.username);
    formDataObj.append('password', formData.password);

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/signup', // Your API endpoint for signup
        formDataObj,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        const corpId = response.data.corp_id; // Get corp_id from the API response
        // You can now store the corp_id in a global state or pass it to the next component
        sessionStorage.setItem('corp_id', corpId);  // Store it in sessionStorage (for this session only)

        // Redirect to login or dashboard after successful signup
        navigate('/dashboard');
      } else {
        setError('Error during signup!');
        console.log(response.data);
      }
    } catch (err) {
      setError('Error during signup!');
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Signup Form</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
