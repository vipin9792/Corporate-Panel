import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUserId, setToken }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make API call for login
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login',  // Replace with your login API endpoint
        values, // Send the form data (email and password)
        {
          headers: {
            // Optional: If needed, send the authorization token here.
          },
        }
      );

      console.log('Login API Response:', response);

      if (response.data.code === 1000) {
        const token = response.data.token;  // Get the token from the API response
        const userId = response.data.userId;  // Get the userId from the API response

        // Set token and userId in App.js state
        setToken(token);  // Store token in App state
        setUserId(userId);  // Store userId in App state

        // Navigate to the Dashboard
        navigate('/Dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred during login.');
    }
    setSubmitting(false); // Stop the form submission process
  };

  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {error && <div>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
