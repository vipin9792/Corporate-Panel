
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




import '../App.css';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Slider from './Slider';

const SignUp = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    emailId: '',
    phoneNo: '',
    address: '',
    userid: '',
    passwd: '',
    name: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Initialize navigate for redirection

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your token

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error and success messages
    setErrorMessage('');
    setSuccessMessage('');

    // Basic client-side validation
    if (!formData.passwd || formData.passwd.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      // Log the data being sent for debugging
      console.log('Sending request with data:', formData);

      const response = await axios.post(
        'http://103.35.121.219:4000/corp/register',
        formData,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      console.log('Response from API:', response);  // Log API response

      if (response.status === 200 && response.data.corp_id) {
        setSuccessMessage('Signup successful! Please verify OTP.');
        // Redirect to OTP page with corp_id
        navigate(`/verify-otp?corpId=${response.data.corp_id}`);
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);  // Log error

      // Check for network error or unexpected errors
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during signup.');
      } else if (error.request) {
        setErrorMessage('Network error. Please check your internet connection.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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




              <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailId">Email ID:</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="userid">User ID:</label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passwd">Password:</label>
          <input
            type="password"
            id="passwd"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}


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
