import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  // Handle the form submission and API call
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login',  // Replace with your login API endpoint
        values
      );

      // Check if the login was successful
      if (response.data.code === 1000) {
        const token = response.data.token; // Assuming the token is part of the response
        const userId = response.data.profile.id; // Assuming user ID is in the response

        console.log('Login successful, redirecting with Token:', token, 'User ID:', userId);

        // Navigate to the Dashboard page, passing token and userId in the state
        navigate('/dashboard', {
          state: {
            token,
            userId,
          }
        });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setSubmitting(false);
    }
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
              <Field type="email" name="email" placeholder="Email" required />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" required />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
