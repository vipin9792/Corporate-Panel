import React from 'react';
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

  const handleSubmit = (values) => {
    console.log('Form data', values);
    // Handle the form submission logic here (e.g., API call)
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
              <div id='carouselExample' className='carousel slide' data-bs-ride='carousel' style={{ width: '400px', margin: 'auto', borderRadius: '24px' }}>
                <div className='carousel-inner'>
                  <div className='carousel-item active'>
                    <img src='item-1.svg' className='d-block w-100' alt='First slide' />
                    <div className='carousel-content text-center'>
                      <h5>First Slide Title</h5>
                      <p>This is some description for the first slide.</p>
                    </div>
                  </div>
                  <div className='carousel-item'>
                    <img src='item-2.svg' className='d-block w-100' alt='Second slide' />
                    <div className='carousel-content text-center'>
                      <h5>Second Slide Title</h5>
                      <p>This is some description for the second slide.</p>
                    </div>
                  </div>
                  <div className='carousel-item'>
                    <img src='item-3.svg' className='d-block w-100' alt='Third slide' />
                    <div className='carousel-content text-center'>
                      <h5>Third Slide Title</h5>
                      <p>This is some description for the third slide.</p>
                    </div>
                  </div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
