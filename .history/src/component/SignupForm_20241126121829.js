import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const BEARER_TOKEN =
    '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  // Initial form values
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
    passwd: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    name: Yup.string().required("Full Name is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/register",
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Signup successful! Please verify OTP.");

        // Fetch the corpId using the API after successful registration
        const profileResponse = await axios.post(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile/${response.data.corp_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        // Navigate to ViewProfile page with corpId as a query parameter
        // navigate(`/view-profile?corpId=${response.data.corp_id}`);
        navigate(`/view-profile?corpId=${corpId}`);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred during signup.");
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

                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;