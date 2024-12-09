// LoginForm.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the corpId passed from the SignupForm via state
  const corpId = location.state?.corpId || null;

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password too short').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    if (!corpId) {
      setError('No corp_id found!');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Send login request along with corp_id
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login',
        { ...values, corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer YOUR_BEARER_TOKEN`,
          },
        }
      );

      // Handle response and redirect if successful
      if (response.data.code === 1000) {
        setMessage('Login successful!');
        alert('Login Successful!');
        navigate('/dashboard'); // Redirect to dashboard or next page
      } else {
        setError('Invalid credentials!');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
