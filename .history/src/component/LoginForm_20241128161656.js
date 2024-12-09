import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setUserId, setToken }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://103.35.121.219:4000/corp/login', values);

      if (response.data.code === 1000) {
        // On successful login, store token and userId in parent state
        setToken(response.data.token); // Assuming token is returned in the response
        setUserId(response.data.profile.id); // Set userId
        console.log('Login successful, redirecting with Token:', response.data.token, 'User ID:', response.data.profile.id);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An error occurred during login.');
    }
    setSubmitting(false);
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
              <Field
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      {/* Show error if login fails */}
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginForm;
