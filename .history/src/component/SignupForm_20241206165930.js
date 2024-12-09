import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import "../App.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [corpId, setCorpId] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

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
    emailId: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNo: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
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
        "http://103.35.121.219:4000/corp/register",
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.corp_id) {
        setSuccessMessage("Signup successful! Please verify OTP.");
        setCorpId(response.data.corp_id);
        navigate(`/verify-otp?corpId=${response.data.corp_id}&email=${values.emailId}`);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
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
                <h4 className="text-secondary" style={{ marginLeft: "200px" }}>
                  Create <br /> <span className="text">An Account</span>
                </h4>
              </div>
              <div className="wrapper-inner signupForm overflow-y-scroll overflow-hidden">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ handleChange, handleBlur }) => (
                    <Form className="bg-white" id="signupForm">
                      {/* Other form fields */}
                      <div className="col-lg-10 mx-auto">
                        <div className="form-floating mb-3 position-relative">
                          <Field
                            type={showPassword ? "text" : "password"}  // Toggle password visibility based on state
                            className="form-control"
                            id="passwd"
                            name="passwd"
                            placeholder="Password"
                            onBlur={handleBlur}
                          />
                          <label htmlFor="passwd">
                            <img src="password.svg" alt="" /> Password
                          </label>

                          {/* Eye Icon inside the input */}
                          <span
                            className="position-absolute eye-icon"
                            style={{ top: "50%", right: "15px", transform: "translateY(-50%)", cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                          >
                            {showPassword ? (
                              <img src="eye-slash.svg" alt="Hide" />
                            ) : (
                              <img src="eye.svg" alt="Show" />
                            )}
                          </span>

                          <ErrorMessage name="passwd" component="div" className="error-message" />
                        </div>
                      </div>


                      <div class="input-group mb-3">
          <input class="form-control password" id="password" class="block mt-1 w-full" type="password" name="password" value="secret!" required />
          <span class="input-group-text togglePassword" id="">
              <i data-feather="eye" style={cursor: pointer"></i>
          </span>
      </div>


                      {/* Other form fields */}
                      <div className="col-lg-10 mx-auto mt-3">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="mytc" name="mytc" />
                          <label htmlFor="mytc" className="form-label fs-6 text-dark">
                            I Accept to the{" "}
                            <a href="#terms-and-condition" className="text-dark">
                              Terms &amp; Condition
                            </a>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-10 mx-auto mt-3">
                        <button type="submit" className="btn btn-primary rounded-pill w-100">
                          {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>

                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
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
