import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    passwd: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://103.35.121.219:4000/login'; // Update with the correct endpoint for login
    const token = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('Login successful!'); // Show success message
      console.log('Response:', response.data);
      // Handle successful login (e.g., redirect to another page)
    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
        setError(`Login failed: ${error.response.data.message || 'Please try again.'}`);
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

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default Axios;
