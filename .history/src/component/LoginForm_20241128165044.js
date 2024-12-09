import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); // Store userId

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be no more than 20 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[\W_]/, 'Password must contain at least one special character')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // API call for login
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login', // Replace with your login API endpoint
        values, // Send the form data (email and password)
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        setMessage('Login successful!');
        setUserId(response.data.profile.id); // Set userId from API response

        // Redirect to profile page with userId as query parameter or state
        navigate(`/ViewProfile/${response.data.profile.id}`);
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
      {/* Your login form JSX */}
    </div>
  );
};

export default LoginForm;
