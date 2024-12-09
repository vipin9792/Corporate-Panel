import React, { useState} from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Slider from './Slider';

const SignUp = () => {
  const [loading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  

  const initialValues = {
    corporateName: '',
    email: '',
    mobileNumber: '',
    corporateLocation: '',
    userId: '',
    password: '',
    mytc: false,
  };

  const validationSchema = Yup.object({
    corporateName: Yup.string().required('Corporate Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    corporateLocation: Yup.string().required('Corporate Location is required'),
    userId: Yup.string().required('User ID is required'),
    password: Yup.string().required('Password is required'),
    mytc: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  
  return (
    <div>
      <section>
        <div className="row credential">
          <div className="col-lg-6 bg-primary text-white bg-icons">
            <div className="imageicon">
              <img src="logo1.png" alt="logo" id="logo" />
              <img src="pen-scale.svg" alt="" />
              <img src="boy.svg" alt="boy" />
              <img src="bulb1.svg" alt="bg-icon-3" />
              <img src="computer-person.svg" alt="bg-icon-8" />
            </div>
            <div className="warapper-form my-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="/LoginPage" className="btn-primary rounded-circle goBack">
                  <img src="arrow-left.svg" alt="go back" />
                </Link>
                <h4 className="text-secondary text-end">Create <br /> <span className="text">An Account</span></h4>
              </div>
              <div className="wrapper-inner signupForm overflow-y-scroll overflow-hidden">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  // onSubmit={handleSubmit}
                >
                  {({ handleChange, handleBlur }) => (
                    <Form className="bg-white" id="signupForm">
                      <div className="row">
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              id="corporateName"
                              name="corporateName"
                              placeholder="name@example.com"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="corporateName"><span><img src="name.svg" alt="" /></span> Corporate Name</label>
                            <ErrorMessage name="corporateName" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="email"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="email"><img src="email.svg" alt="date" className="img-fluid" /> Email*</label>
                            <ErrorMessage name="email" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="tel"
                              className="form-control"
                              id="mobileNumber"
                              name="mobileNumber"
                              placeholder="tel"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="mobileNumber"><img src="contact.svg" alt="date" className="img-fluid" /> Corporate Mobile Number*</label>
                            <ErrorMessage name="mobileNumber" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              id="corporateLocation"
                              name="corporateLocation"
                              placeholder="Uname"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="corporateLocation"><img src="state.svg" alt="user" /> Corporate Location*</label>
                            <ErrorMessage name="corporateLocation" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              id="userId"
                              name="userId"
                              placeholder="Uname"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="userId"><img src="user.svg" alt="user" /> Corporate User ID*</label>
                            <ErrorMessage name="userId" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              placeholder="Password"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="password"><img src="password.svg" alt="" /> Password</label>
                            <ErrorMessage name="password" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto mt-3">
                          <div className="form-check ">
                            <Field type="checkbox" className="form-check-input bg-secondary " id="mytc" name="mytc" />
                            <label htmlFor="mytc" className="form-label fs-6 text-dark ">
                              I Accept to the <a href="#terms-and-condition" className="text-dark">Terms &amp; Condition</a>
                            </label>
                            <ErrorMessage name="mytc" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <button type="submit" className="btn btn-primary rounded-pill w-100">
                              {loading ? 'Submitting...' : 'Register'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </div>
            </div>
          </div>

         


<Slider/>












        </div>
      </section>
    </div>
  );
};

export default SignUp;
