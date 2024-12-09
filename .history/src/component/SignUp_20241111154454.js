import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignUp = () => {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleSubmit = (values) => {
    console.log('Form data', values);
    // Handle the form submission logic here (e.g., API call)
  };

  // Fetch data for the carousel
  useEffect(() => {
    axios.get('http://103.35.121.219:4000/init/getPhotoSlider')
      .then(response => {
        setSliderData(response.data); // Assuming the data returned is an array of images and descriptions
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

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
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur }) => (
                    <Form className="bg-white" id="signupForm">
                      <div className="row">
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="corporateName" name="corporateName" placeholder="name@example.com" onBlur={handleBlur} />
                            <label htmlFor="corporateName"><span><img src="name.svg" alt="" /></span> Corporate Name</label>
                            <ErrorMessage name="corporateName" component="div"  className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="email" className="form-control" id="email" name="email" placeholder="email" onBlur={handleBlur} />
                            <label htmlFor="email"><img src="email.svg" alt="date" className="img-fluid" /> Email*</label>
                            <ErrorMessage name="email" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="tel" className="form-control" id="mobileNumber" name="mobileNumber" placeholder="tel" onBlur={handleBlur} />
                            <label htmlFor="mobileNumber"><img src="contact.svg" alt="date" className="img-fluid" /> Corporate Mobile Number*</label>
                            <ErrorMessage name="mobileNumber" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="corporateLocation" name="corporateLocation" placeholder="Uname" onBlur={handleBlur} />
                            <label htmlFor="corporateLocation"><img src="state.svg" alt="user" /> Corporate Location*</label>
                            <ErrorMessage name="corporateLocation" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="userId" name="userId" placeholder="Uname" onBlur={handleBlur} />
                            <label htmlFor="userId"><img src="user.svg" alt="user" /> Corporate User ID*</label>
                            <ErrorMessage name="userId" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field type="password" className="form-control" id="password" name="password" placeholder="Password" onBlur={handleBlur} />
                            <label htmlFor="password"><img src="password.svg" alt="" /> Password</label>
                            <ErrorMessage name="password" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto mt-3">
                          <div className="form-check ">
                            <Field type="checkbox" className="form-check-input bg-secondary  " id="mytc" name="mytc" />
                            <label htmlFor="mytc" className="form-label fs-6 text-dark ">
                              I Accept to the <a href="#terms-and-condition" className="text-dark">Terms &amp; Condition</a>
                            </label>
                            <ErrorMessage name="mytc" component="div" className="error-message" />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <button type="submit" className="btn btn-primary rounded-pill w-100">Register</button>
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
            <h4>About <br /> <span className="fw-bold"> Pareekshan</span></h4>
            <div className="imageicon1 signupFormIcons">
              <img src="book.svg" alt="book" />
              <img src="star-boy.svg" alt="star-boy" />
              <img src="support.svg" alt="support" />
              <img src="gradutation-cap.svg" alt="gradutation-cap" />
              <img src="puzzle.svg" alt="puzzle" />
            </div>
            <div className="warapper-form-alert carouselWrapper" style={{ marginTop: "50px" }}>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <div id='carouselExample' className='carousel slide' data-bs-ride='carousel' style={{ width: '400px', margin: 'auto', borderRadius: '24px' }}>
                  <div className='carousel-inner'>
                    {sliderData.map((item, index) => (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <img src={item.imageUrl} className='d-block w-100' alt={`Slide ${index + 1}`} />
                        <div className='carousel-content text-center'>
                          <h5>{item.title}</h5>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='carousel-buttons text-center mt-3'>
                    <button className='btn btn-primary btn-sm' type='button' data-bs-target='#carouselExample' data-bs-slide='prev'>
                      <i className='bi bi-chevron-left text-white fs-6'></i>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button className='btn btn-primary btn-sm' type='button' data-bs-target='#carouselExample' data-bs-slide='next'>
                      <i className='bi bi-chevron-right text-white fs-6'></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;