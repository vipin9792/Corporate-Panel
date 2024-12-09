import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    emailId: '',
    phoneNo: '',
    address: '',
    userId: '',
    passwd: '',
    name: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://103.35.121.219:4000/';
    const token = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Signup successful!'); // Show success message
      console.log('Response:', response.data);
      // Reset form if needed
      setFormData({
        companyName: '',
        emailId: '',
        phoneNo: '',
        address: '',
        userId: '',
        passwd: '',
        name: ''
      });
    } catch (error) {
      if (error.response) {
        // Check for specific status code or message indicating duplication
        if (error.response.status === 409) {
          // 409 Conflict is a common status code for duplicates
          setError('This data already exists. Please use a different entry.');
        } else {
          // Log and show other errors
          console.error('Error Response:', error.response.data);
          setError(`Signup failed: ${error.response.data.message || 'Please try again.'}`);
        }
      } else if (error.request) {
        console.error('Error Request:', error.request);
        setError('No response from the server. Please try again.');
      } else {
        console.error('Error Message:', error.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group controlId="formCompanyName">
        <Form.Label>Company Name</Form.Label>
        <Form.Control 
          type="text" 
          name="companyName" 
          value={formData.companyName} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formEmailId">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="email" 
          name="emailId" 
          value={formData.emailId} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formPhoneNo">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control 
          type="tel" 
          name="phoneNo" 
          value={formData.phoneNo} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formUserId">
        <Form.Label>User ID</Form.Label>
        <Form.Control 
          type="text" 
          name="userId" 
          value={formData.userId} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          name="passwd" 
          value={formData.passwd} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignupForm;
