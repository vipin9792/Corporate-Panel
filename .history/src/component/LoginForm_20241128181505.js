import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(20, 'Password must be no more than 20 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login',
        values, 
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`,
          },
        }
      );

      if (response.data.code === 1000) {
        setMessage('Login successful!');
        alert('Login Successful!');

        // Assuming `response.data.profile.id` is the `corp_id`
        const corpId = response.data.profile.id;

        // Navigate to ViewProfile page with corp_id in URL
        navigate(`/ViewProfile/${corpId}`);
      } else {
        setError('Invalid credentials. Please try again.');
        alert('Login Failed! Invalid credentials.');
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
            <div className="form-group">
              <Field type="email" name="email" placeholder="Enter email" required />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="form-group">
              <Field type="password" name="password" placeholder="Enter password" required />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
