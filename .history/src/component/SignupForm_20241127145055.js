import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

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
    emailId: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNo: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
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
        <div className="form-container">
          <h2>Create an Account</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <div>
                  <label htmlFor="companyName">Company Name</label>
                  <Field type="text" id="companyName" name="companyName" placeholder="Company Name" />
                  <ErrorMessage name="companyName" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="emailId">Email</label>
                  <Field type="email" id="emailId" name="emailId" placeholder="Email" />
                  <ErrorMessage name="emailId" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="phoneNo">Phone Number</label>
                  <Field type="tel" id="phoneNo" name="phoneNo" placeholder="Phone Number" />
                  <ErrorMessage name="phoneNo" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="address">Address</label>
                  <Field type="text" id="address" name="address" placeholder="Address" />
                  <ErrorMessage name="address" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="userid">User ID</label>
                  <Field type="text" id="userid" name="userid" placeholder="User ID" />
                  <ErrorMessage name="userid" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="passwd">Password</label>
                  <Field type="password" id="passwd" name="passwd" placeholder="Password" />
                  <ErrorMessage name="passwd" component="div" className="error-message" />
                </div>

                <div>
                  <label htmlFor="name">Full Name</label>
                  <Field type="text" id="name" name="name" placeholder="Full Name" />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div>
                  <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
                </div>
              </Form>
            )}
          </Formik>

          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
