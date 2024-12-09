import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, '8 chars min')
      .max(20, '20 chars max')
      .matches(/[A-Z]/, '1 uppercase')
      .matches(/[a-z]/, '1 lowercase')
      .matches(/[0-9]/, '1 number')
      .matches(/[\W_]/, '1 special char')
      .required('Required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage('');
    
    // Prepare login data
    const loginData = {
      email: values.email,
      password: values.password,
    };

    try {
      // Send POST request to login API
      const response = await axios.post("http://103.35.121.219:4000/corp/login", loginData);

      console.log(response); // Log the response for debugging

      // Assuming response contains the Bearer token in the 'token' field
      const token = response.data.token;

      if (token) {
        // On successful login, pass the token to the parent component (if necessary)
        alert("Login successful!");
        // Here, you can set the token in local storage or state if needed
      } else {
        // If the token is not returned, show an error
        setErrorMessage("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      // Handle error during API call
      console.error("Login error:", error.response || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again later.");
    }
    
    setSubmitting(false); // Stop the form submission process
  };

  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img src="logo1.png" alt="logo" id="logo" />
                <img src="pen-scale.svg" alt="bg-icon-1" />
                <img src="boy.svg" alt="boy" />
                <img src="bulb1.svg" alt="bulb1" />
                <img src="computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Link to="/SignUp" className="btn-primary rounded-circle goBack">
                    <img src="arrow-left.svg" alt="go back" />
                  </Link>
                  <h4 className="text-secondary text-end">Corporate <br /> <span className="text">Login</span></h4>
                </div>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-10 mx-auto my-2">
                          <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="floatingInput" name="email" placeholder=" " required />
                            <label htmlFor="floatingInput" className="label-with-icon">
                              <span><img src="user.svg" alt="Icon" /></span>Username/Email*
                            </label>
                            <ErrorMessage name="email" component="div" className="error-message" />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="password" className="form-control" id="floatingPassword" name="password" placeholder=" " required />
                            <label htmlFor="password">
                              <span>
                                <img src="password.svg" alt="Icon" className="icon" />&nbsp;
                              </span>
                              Password*
                            </label>
                            <div className="fogot-pass">
                              <Link to="/ForgetPassword" className="text-decoration-none float-end">Forgot Password?</Link>
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating pass forgot">
                            <button type="submit" className="btn btn-primary text-white rounded-pill w-100 loginBtn" disabled={isSubmitting}>
                              {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                            <p className="mb-0">
                              <span className="text-secondary fw-semibold">Not registered Yet?</span>&nbsp;
                              <Link to="/SignUp" className="text-decoration-none">Create an account</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              </div>
            </div>
            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
