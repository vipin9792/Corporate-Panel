import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUserId }) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login',
        values
      );

      if (response.data.code === 1000) {
        setUserId(response.data.profile.id); // Set the userId in the parent component
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
  );
};

export default LoginForm;
