import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
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

  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch carousel data
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch('http://103.35.121.219:4000/init/getPhotoSlider');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCarouselData(data);
      } catch (error) {
        console.error('Error fetching carousel data:', error);
      }
    };

    fetchCarouselData();
  }, []);

  const handleSubmit = (values) => {
    console.log('Form data', values);
    // Handle form submission (e.g., API call)
  };

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
                {/* <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                              autocomplete="organization" // Added autocomplete attribute for corporate name
                            />
                            <label htmlFor="corporateName"><span><img src="name.svg" alt="" /></span> Corporate Name</label>
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
                              autocomplete="email" // Added autocomplete for email
                            />
                            <label htmlFor="email"><img src="email.svg" alt="email" className="img-fluid" /> Email*</label>
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
                              autocomplete="tel" // Added autocomplete for mobile
                            />
                            <label htmlFor="mobileNumber"><img src="contact.svg" alt="date" className="img-fluid" /> Corporate Mobile Number*</label>
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
                              autocomplete="address-level1" // Added autocomplete for location
                            />
                            <label htmlFor="corporateLocation"><img src="state.svg" alt="user" /> Corporate Location*</label>
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
                              placeholder="User ID"
                              onBlur={handleBlur}
                              autocomplete="username" // Added autocomplete for username
                            />
                            <label htmlFor="userId"><img src="user.svg" alt="user" /> Corporate User ID*</label>
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
                              autocomplete="new-password" // Added autocomplete for password
                            />
                            <label htmlFor="password"><img src="password.svg" alt="" /> Password</label>
                            <ErrorMessage name="password" component="div" className="error-message " />
                          </div>
                        </div>
                        <div className="col-lg-10 mx-auto mt-3">
                          <div className="form-check ">
                            <Field
                              type="checkbox"
                              className="form-check-input bg-secondary"
                              id="mytc"
                              name="mytc"
                            />
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
                </Formik> */}



<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
              autoComplete="off"  // Correct attribute name
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
              autoComplete="email"  // Correct attribute name
            />
            <label htmlFor="email"><img src="email.svg" alt="email" className="img-fluid" /> Email*</label>
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
              autoComplete="tel"  // Correct attribute name
            />
            <label htmlFor="mobileNumber"><img src="contact.svg" alt="contact" className="img-fluid" /> Corporate Mobile Number*</label>
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
              autoComplete="off"  // Correct attribute name
            />
            <label htmlFor="corporateLocation"><img src="state.svg" alt="state" /> Corporate Location*</label>
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
              autoComplete="off"  // Correct attribute name
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
              autoComplete="new-password"  // Correct attribute name
            />
            <label htmlFor="password"><img src="password.svg" alt="" /> Password</label>
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>
        </div>

        <div className="col-lg-10 mx-auto mt-3">
          <div className="form-check">
            <Field
              type="checkbox"
              className="form-check-input bg-secondary"
              id="mytc"
              name="mytc"
            />
            <label htmlFor="mytc" className="form-label fs-6 text-dark">
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
              <img src="gradutation-cap.svg" alt="graduation-cap" />
              <img src="puzzle.svg" alt="puzzle" />
            </div>

            <div className="warapper-form-alert carouselWrapper" style={{ marginTop: "50px" }}>
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ width: '400px', margin: 'auto', borderRadius: '24px' }}>
                  <div className="carousel-inner">
                    {carouselData.map((item, index) => (
                      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.id}>
                        <img src={item.imageUrl} className="d-block w-100" alt={`Slide ${index + 1}`} />
                        <div className="carousel-content text-center">
                          <h5>{item.title}</h5>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="carousel-buttons text-center mt-3">
                    <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <i className="bi bi-chevron-left text-white fs-6"></i>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <i className="bi bi-chevron-right text-white fs-6"></i>
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
