// src/MyForm.js

import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    emailId: '',
    phoneNo: '',
    address: '',
    userId: '',
    passwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the form data

    try {
      const response = await axios.post('https://yourapi.com/endpoint', formData);
      console.log('Response:', response.data); // Log the response
      // Handle success (e.g., show a message, redirect, etc.)
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error:', error); // Log the error
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email ID:
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          User ID:
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
