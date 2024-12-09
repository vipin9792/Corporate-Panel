import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Make sure to replace with your actual token
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN'; 

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();  // Initialize navigate for redirection

  // Initial form data values
  const initialValues = {
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  };

  // Validation schema using Yup
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

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // API call for signup
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/register',
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.corp_id) {
        setSuccessMessage('Signup successful! Please verify OTP.');

        // Redirect to the ViewProfile page with the corpId in the URL
        navigate(`/view-profile?corpId=${response.data.corp_id}`);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);

      // Handle errors
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

  return (
    <div>
      <section>
        <div className="row credential">
          <div className="col-lg-6 bg-primary text-white bg-icons">
            <div className="inner-bg">
              <img src="assets/images/icons/brand-logo.png" className="img-fluid" alt="logo" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="wrapper-inner signupForm">
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
                            id="companyName"
                            name="companyName"
                            placeholder="Company Name"
                            onBlur={handleBlur}
                          />
                          <label htmlFor="companyName">Company Name</label>
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
                            placeholder="Email Address"
                            onBlur={handleBlur}
                          />
                          <label htmlFor="emailId">Email</label>
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
                            type="text"
                            className="form-control"
                            id="phoneNo"
                            name="phoneNo"
                            placeholder="Phone Number"
                            onBlur={handleBlur}
                          />
                          <label htmlFor="phoneNo">Phone Number</label>
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
                          <label htmlFor="address">Address</label>
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
                          <label htmlFor="userid">User ID</label>
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
                          <label htmlFor="passwd">Password</label>
                          <ErrorMessage
                            name="passwd"
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
                            id="name"
                            name="name"
                            placeholder="Full Name"
                            onBlur={handleBlur}
                          />
                          <label htmlFor="name">Full Name</label>
                          <ErrorMessage
                            name="name"
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

              {successMessage && (
                <div className="alert alert-success mt-3">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
