import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [carouselData, setCarouselData] = useState([]);
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

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch carousel data
  useEffect(() => {
  const fetchCarouselData = async () => {
    try {
      console.log('Fetching carousel data...');
      const response = await fetch('http://103.35.121.219:4000/init/getPhotoSlider');
      
      console.log('Response status:', response.status); // Log status
      
      if (!response.ok) {
        throw new Error('Failed to fetch carousel data');
      }
      
      const data = await response.json();
      console.log('Fetched carousel data:', data); // Log fetched data

      setCarouselData(data); // Set the data when it successfully fetches
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      setError('Failed to load carousel data'); // Set error message
      setLoading(false);
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
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur }) => (
                    <Form className="bg-white" id="signupForm">
                      <div className="row">
                        {/* Your form fields here */}
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
                // Loading Spinner
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                // Error Message
                <div className="text-center" style={{ color: 'red' }}>
                  <p>{error}</p>
                </div>
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
