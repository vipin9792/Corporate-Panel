import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Validation schema for the email input
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // API call for forget password
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/forgetPassword',
        values,
      );

      // Log the response to check the data
      console.log('Forget Password API Response:', response);

      if (response.data.code === 1000) {
        setMessage('Password reset link has been sent to your email!');
        setError('');
        setTimeout(() => {
          navigate('/Login'); // Redirect back to the login page after success
        }, 2000);
      } else {
        setMessage('');
        setError('Failed to send reset link. Please try again.');
      }
    } catch (err) {
      console.error('Error in forget password:', err);
      setError('An error occurred. Please try again later.');
      setMessage('');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img src="logo1.png" alt="logo" id="logo" />
              </div>
              <div className="warapper-form">
                <h4 className="text-secondary">Forgot Password</h4>

                {/* Formik for handling the form and validation */}
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-10 mx-auto my-2">
                          <div className="form-floating mb-3">
                            <Field
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Enter your email"
                            />
                            <label htmlFor="email">
                              <span><img src="user.svg" alt="Icon"  /></span>Email Address*
                            </label>
                            <ErrorMessage name="email" component="div" className="error-message" />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto">
                          <button
                            type="submit"
                            className="btn btn-primary text-white rounded-pill w-100"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {/* Show success or error messages */}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
