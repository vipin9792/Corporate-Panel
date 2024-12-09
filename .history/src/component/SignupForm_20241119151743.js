import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Slider from "./Slider";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false); // State to toggle OTP form
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // To store the user's email for OTP verification
  const navigate = useNavigate(); // Initialize navigate for redirection

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your token

  const initialValues = {
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    userid: Yup.string().required("User ID is required"),
    passwd: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    name: Yup.string().required("Full Name is required"),
  });

  // Handle signup form submission
  const handleSignupSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      console.log('Sending request with data:', values);

      const response = await axios.post(
        'http://103.35.121.219:4000/corp/register',
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      console.log('Response from API:', response);

      if (response.status === 200 && response.data.corp_id) {
        setSuccessMessage('Signup successful! Please verify OTP.');
        localStorage.setItem('corp_id', response.data.corp_id); // Store corp_id in localStorage
        setEmail(values.emailId); // Save email for OTP verification
        setShowOtpVerification(true); // Show OTP verification form
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during signup.');
      } else if (error.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const corp_id = localStorage.getItem('corp_id'); // Retrieve the corp_id from localStorage

    if (!corp_id) {
      setError('Corp ID is missing. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP', // OTP verification API endpoint
        { corp_id, email, otp }, // Include corp_id, email, and otp
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );

      console.log('OTP Verification Response:', response);

      if (response.data.code === 1000) {
        setSuccessMessage('Email verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/login');
      } else {
        setError(`OTP verification failed: ${response.data.status}`);
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      setError('An error occurred during OTP verification.');
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
                <Link
                  to="/LoginPage"
                  className="btn-primary rounded-circle goBack"
                >
                  <img src="arrow-left.svg" alt="go back" />
                </Link>
                <h4 className="text-secondary text-end">
                  {showOtpVerification ? "Verify Your Email" : "Create an Account"}
                </h4>
              </div>

              <div className="wrapper-inner signupForm overflow-y-scroll overflow-hidden">
                {/* Signup Form */}
                {!showOtpVerification ? (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSignupSubmit}
                  >
                    {({ handleChange, handleBlur }) => (
                      <Form className="bg-white" id="signupForm">
                        <div className="row">
                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="text"
                                className="form-control"
                                id="companyName"
                                name="companyName"
                                placeholder="Company Name"
                                onBlur={handleBlur}
                              />
                              <label htmlFor="companyName">
                                <span>
                                  <img src="name.svg" alt="" />
                                </span>{" "}
                                Company Name
                              </label>
                              <ErrorMessage
                                name="companyName"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="email"
                                className="form-control"
                                id="emailId"
                                name="emailId"
                                placeholder="Email"
                                onBlur={handleBlur}
                              />
                              <label htmlFor="emailId">
                                <img
                                  src="email.svg"
                                  alt="date"
                                  className="img-fluid"
                                />{" "}
                                Email*
                              </label>
                              <ErrorMessage
                                name="emailId"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="tel"
                                className="form-control"
                                id="phoneNo"
                                name="phoneNo"
                                placeholder="Phone Number"
                                onBlur={handleBlur}
                              />
                              <label htmlFor="phoneNo">
                                <img
                                  src="contact.svg"
                                  alt="date"
                                  className="img-fluid"
                                />{" "}
                                Phone Number*
                              </label>
                              <ErrorMessage
                                name="phoneNo"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Address"
                                onBlur={handleBlur}
                              />
                              <label htmlFor="address">
                                <img
                                  src="address.svg"
                                  alt="address"
                                  className="img-fluid"
                                />{" "}
                                Address
                              </label>
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="text"
                                className="form-control"
                                id="userid"
                                name="userid"
                                placeholder="User ID"
                                onBlur={handleBlur}
                              />
                              <label htmlFor="userid">
                                <img
                                  src="user.svg"
                                  alt="user"
                                  className="img-fluid"
                                />{" "}
                                User ID
                              </label>
                              <ErrorMessage
                                name="userid"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="password"
                                className="form-control"
                                id="passwd"
                                name="passwd"
                                placeholder="Password"
                                onBlur={handleBlur}
                              />
                              <label htmlFor="passwd">
                                <img
                                  src="lock.svg"
                                  alt="lock"
                                  className="img-fluid"
                                />{" "}
                                Password
                              </label>
                              <ErrorMessage
                                name="passwd"
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto mt-3">
                            <button
                              type="submit"
                              className="btn btn-primary rounded-pill w-100"
                            >
                              {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  // OTP Verification Form
                  <div>
                    <h4>Enter the OTP sent to {email}</h4>
                    <form onSubmit={handleVerifyOtp}>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                      />
                      <button type="submit">
                        Verify OTP
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Slider />
        </div>
      </section>
    </div>
  );
};

export default SignUp;