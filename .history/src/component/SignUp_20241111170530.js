import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [carouselData, setCarouselData] = useState([]); // State for carousel data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Initial values for the form
  const initialValues = {
    corporateName: '',
    email: '',
    mobileNumber: '',
    corporateLocation: '',
    userId: '',
    password: '',
    mytc: false,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    corporateName: Yup.string().required('Corporate Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
    corporateLocation: Yup.string().required('Corporate Location is required'),
    userId: Yup.string().required('User ID is required'),
    password: Yup.string().required('Password is required'),
    mytc: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    console.log('Form data', values);
    // Handle the form submission logic here (e.g., API call)
  };

  // Fetch carousel data from API
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch('http://103.35.121.219:4000/init/getPhotoSlider');
        if (!response.ok) {
          throw new Error('Failed to fetch carousel data');
        }
        const data = await response.json();
        setCarouselData(data); // Set the data when it successfully fetches
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setError('Failed to load carousel data'); // Handle any errors
        setLoading(false);
      }
    };

    fetchCarouselData();
  }, []); // Empty dependency array means it runs only once when the component mounts

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
                  onSubmit={handleSubmit}
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
                              placeholder="Corporate Name"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="corporateName">Corporate Name</label>
                            <ErrorMessage name="corporateName" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Email"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="email">Email*</label>
                            <ErrorMessage name="email" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="tel"
                              className="form-control"
                              id="mobileNumber"
                              name="mobileNumber"
                              placeholder="Mobile Number"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="mobileNumber">Mobile Number*</label>
                            <ErrorMessage name="mobileNumber" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              id="corporateLocation"
                              name="corporateLocation"
                              placeholder="Corporate Location"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="corporateLocation">Corporate Location*</label>
                            <ErrorMessage name="corporateLocation" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              id="userId"
                              name="userId"
                              placeholder="Corporate User ID"
                              onBlur={handleBlur}
                            />
                            <label htmlFor="userId">Corporate User ID*</label>
                            <ErrorMessage name="userId" component="div" className="error-message " />
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
                            <label htmlFor="password">Password*</label>
                            <ErrorMessage name="password" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto mt-3">
                          <div className="form-check">
                            <Field
                              type="checkbox"
                              className="form-check-input"
                              id="mytc"
                              name="mytc"
                            />
                            <label htmlFor="mytc" className="form-label fs-6">
                              I accept the <a href="#terms-and-condition">Terms & Conditions</a>
                            </label>
                            <ErrorMessage name="mytc" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <button type="submit" className="btn btn-primary rounded-pill w-100">
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          <div className="col-lg-6 bg-white bg-icons-right">
            <h4>About <br /> <span className="fw-bold">Pareekshan</span></h4>

            {/* Display Loading... while fetching data */}
            {loading && <p>Loading carousel data...</p>}
            {/* Display error message if there's an error */}
            {error && <p className="text-danger">{error}</p>}

            {/* Carousel rendering if data is fetched */}
            {!loading && !error && carouselData.length > 0 && (
              <div className="carousel-wrapper">
                {carouselData.map((item, index) => (
                  <div key={index} className="carousel-item">
                    <img src={item.imageUrl} alt={item.title} />
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
