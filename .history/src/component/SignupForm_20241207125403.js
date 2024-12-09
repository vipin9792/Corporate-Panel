import React, { useState } from "react";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [corpId, setCorpId] = useState(null); // State to store corp_id
  const navigate = useNavigate(); // Initialize navigate for redirection

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Replace with your token

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

      if (response.status === 200 && response.data.corp_id) {
        setSuccessMessage("Signup successful! Please verify OTP.");

        // Store the corp_id in state
        setCorpId(response.data.corp_id);

        // Redirect to OTP verification page with the corpId as a query parameter
        navigate(
          `/verify-otp?corpId=${response.data.corp_id}&email=${values.emailId}`
        );
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);

      // Handle different error cases
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred during signup."
        );
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
                <h4 className="text-secondary" style={{marginLeft:"200px"}}>
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
                        {/* Form fields omitted for brevity */}

                        
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
						
						
						
                        
                        {/* Password Field */}
                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type={showPassword ? "text" : "password"} // Toggle between password and text
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
                            {/* Eye Icon for toggling visibility */}
                            <span
                              className="eye-icon"
                              onClick={() => setShowPassword(!showPassword)} 
                             
                            >
                              <img
                                src={showPassword ? "eye.png" : "eye.png" }
                                alt="Toggle Password Visibility"
                                style={{position:"absolu",marginLeft: "222px",marginTop: "-99px",cursor:"pointer",width:"20px",height:"20px"}}
                              />
                            </span>
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
                              <a
                                href="#terms-and-condition"
                                className="text-dark"
                              >
                                Terms &amp; Condition
                              </a>
                            </label>
                          </div>
                        </div>


                        {/* Other form fields omitted for brevity */}
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
