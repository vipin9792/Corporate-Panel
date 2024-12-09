import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [authToken, setAuthToken] = useState(''); // Temporary state for token

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login', // Your login API endpoint
        values // Send the form data (email and password)
      );

      if (response.data.code === 1000) {
        const token = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';
        
        setAuthToken(token); // Store token in state

        // Navigate to dashboard upon successful login
        navigate('/Dashboard');
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
