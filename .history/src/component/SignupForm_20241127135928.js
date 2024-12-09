import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useForm } from "../FormContext"; // Import the useForm hook

import Slider from "./Slider";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setFormData } = useForm(); // Get the setFormData function from context
  const navigate = useNavigate();

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Replace with your token

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

    try {
      // Sending the signup data to the API
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/register',
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      // Check for success
      if (response.status === 200 && response.data.corp_id) {
        // Storing the profile data in context
        setFormData({
          corpId: response.data.corp_id,
          companyName: values.companyName,
          emailId: values.emailId,
          phoneNo: values.phoneNo,
          address: values.address,
          name: values.name,
        });

        // Redirect to profile page
        navigate("/profile");
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError('Signup error: ' + (error.response?.data?.message || error.message));
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
                <Link
                  to="/LoginForm"
                  className="btn-primary rounded-circle goBack"
                >
                  <img src="arrow-left.svg" alt="go back" />
                </Link>
                <h4 className="text-secondary text-end">
                  Create <br /> <span className="text">An Account</span>
                </h4>
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
                              <img src="state.svg" alt="user" /> Address*
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
                              <img src="user.svg" alt="user" /> User ID*
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
                              <img src="password.svg" alt="" /> Password
                            </label>
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
                            <label htmlFor="name">
                              <img src="name.svg" alt="" /> Full Name*
                            </label>
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="error-message"
                            />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto mt-3">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="mytc"
                              name="mytc"
                            />
                            <label
                              htmlFor="mytc"
                              className="form-label fs-6 text-dark"
                            >
                              I Accept to the{" "}
                              <a href="#terms-and-condition" className="text-dark">
                                Terms &amp; Condition
                              </a>
                            </label>
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

          <Slider />
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
