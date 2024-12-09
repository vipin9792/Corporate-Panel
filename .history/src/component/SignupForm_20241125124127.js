import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Slider from "./Slider";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your token

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
      console.log("Sending request with data:", values);

      // API call for signup
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/register",
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      console.log("Response from API:", response);

      if (response.status === 200 && response.data && response.data.corp_id) {
        setSuccessMessage("Signup successful! Please verify OTP.");
        localStorage.setItem("corp_id", response.data.corp_id); // Store corp_id
        navigate(`/verify-otp?corpId=${response.data.corp_id}&email=${values.emailId}`);
      } else {
        // Show error message when corp_id is not found
        setError("No company ID found. Please log in again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        setError(error.response.data.message || "An error occurred during signup.");
      } else if (error.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An error occurred. Please try again.");
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
                        {/* Form fields here */}
                      </div>
                      {error && <div className="error-message">{error}</div>}
                      {successMessage && <div className="success-message">{successMessage}</div>}
                      <button
                        type="submit"
                        className="btn btn-primary rounded-0 w-100"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-lg-6 bg-light text-dark">
            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
