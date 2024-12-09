import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Slider from "./Slider";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

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

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
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

        // Store corp_id in localStorage
        localStorage.setItem('corp_id', response.data.corp_id);

        // Redirect to OTP verification page with the corpId and email as query parameters
        navigate(`/verify-otp?corpId=${response.data.corp_id}&email=${values.emailId}`);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
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
                <Link to="/LoginForm" className="btn-primary rounded-circle goBack">
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
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="companyName">Company Name</label>
                            <Field
                              type="text"
                              id="companyName"
                              name="companyName"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="companyName"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="emailId">Email</label>
                            <Field
                              type="email"
                              id="emailId"
                              name="emailId"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="emailId"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="phoneNo">Phone No.</label>
                            <Field
                              type="text"
                              id="phoneNo"
                              name="phoneNo"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="phoneNo"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="userid">User ID</label>
                            <Field
                              type="text"
                              id="userid"
                              name="userid"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="userid"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="passwd">Password</label>
                            <Field
                              type="password"
                              id="passwd"
                              name="passwd"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="passwd"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <Field
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            {loading ? "Submitting..." : "Sign Up"}
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
