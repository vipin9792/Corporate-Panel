import React, { useState } from "react";


To fully prevent non-numeric characters (like letters) from being entered into the phone number input field, we need to ensure that the input field strictly accepts only numeric values and stops any other characters from being typed.

In addition to the pattern and maxLength, we need to use the onInput event to immediately block any non-numeric input by programmatically filtering the input value. Here's how we can approach it:

Updated Solution
React Input Field with onInput Handler: We'll add an onInput event to manually ensure that only numeric values are entered by the user.
Full Solution (React):
jsx
Copy code
import { Field, ErrorMessage } from 'formik';


import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import SignupAPI from "../Api Folder/SignupAPI"; // Assuming your API is here

const SignupForm = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [corpId, setCorpId] = useState(null);
  const navigate = useNavigate();

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Replace with your token

  const initialValues = {
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
    mytc: false,
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    // phoneNo: Yup.string()
    //   .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    //   .required("Phone number is required"),

    phoneNo: Yup.string()
  .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits and only numeric") // Enforces 10 digits only
  .required("Phone number is required"), // Required field


    address: Yup.string().required("Address is required"),
    userid: Yup.string().required("User ID is required"),
    passwd: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    name: Yup.string().required("Full Name is required"),
    mytc: Yup.boolean()
      .oneOf([true], "You must accept the Terms & Conditions")
      .required("You must accept the Terms & Conditions"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError({});
    setSuccessMessage("");

    try {
      const response = await SignupAPI(values, BEARER_TOKEN);

      // Log response from API for debugging
      console.log("Response from API:", response);

      if (response.status === 200 && response.data.corp_id) {
        // If response is successful and contains a valid corp_id, proceed
        setSuccessMessage("Signup successful! Please verify OTP.");
        setCorpId(response.data.corp_id);

        // Navigate to OTP page with the corpId and email as query params
        navigate(
          `/verify-otp?corpId=${response.data.corp_id}&email=${values.emailId}`
        );
      } else if (response.data.code === 1001) {
        // Handling specific error cases from the API
        const errorField = response.data.status.includes("Phone number")
          ? "phoneNo"
          : response.data.status.includes("Email")
          ? "emailId"
          : null;

        if (errorField) {
          setError((prevError) => ({
            ...prevError,
            [errorField]: response.data.status,
          }));
        } else {
          setError({ general: "Signup failed. Please try again." });
        }
      }
    } catch (error) {
      setError({ general: "An unexpected error occurred. Please try again." });
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (event, setFieldValue) => {
    const isChecked = event.target.checked;
    setFieldValue("mytc", isChecked);
    setCheckboxChecked(isChecked);
  };

  return (
    <div>
      <section>
        <div className="row credential">
          <div className="col-lg-6 bg-primary text-white bg-icons">
            <div className="imageicon">
              <img
                src="logo1.png"
                alt="logo"
                id="logo"
                style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
              />
              <img src="pen-scale.svg" alt="" />
              <img src="boy.svg" alt="bg-icon-3" />
              <img src="bulb1.svg" alt="bg-icon-8" />
            </div>
            <div className="warapper-form mt-3 p-2">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="text-secondary" style={{ marginLeft: "200px" }}>
                  Create <br /> <span className="text">An Account</span>
                </h4>
              </div>
              <div className="wrapper-inner signupForm overflow-y-scroll overflow-hidden">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange, handleBlur, values, setFieldValue }) => (
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
                            {error.emailId && (
                              <div className="error-message">{error.emailId}</div>
                            )}
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
      maxLength="10"  // Limits input to 10 characters
      pattern="^[0-9]{10}$"  // Ensures only 10 digits are allowed
      inputMode="numeric" // Optimizes for numeric input on mobile
      title="Phone number must be numeric and exactly 10 digits" // Tooltip for invalid input
      required
    />
    <label htmlFor="phoneNo">
      <img src="contact.svg" alt="date" className="img-fluid" /> Phone Number*
    </label>
    <ErrorMessage
      name="phoneNo"
      component="div"
      className="error-message"
    />
    {error.phoneNo && (
      <div className="error-message">{error.phoneNo}</div>
    )}
  </div>
</div>




                        {/* <div className="col-lg-10 mx-auto">
                          <div className="form-floating mb-3">
                            <Field
                              type="tel"
                              className="form-control"
                              id="phoneNo"
                              name="phoneNo"
                              placeholder="Phone Number"
                              onBlur={handleBlur}
                              maxLength="10"
                              pattern="[0-9]{10}"
                               inputMode="numeric"
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
                            {error.phoneNo && (
                              <div className="error-message">{error.phoneNo}</div>
                            )}
                          </div>
                        </div> */}

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

{/* {error.address && (
                              <div className="error-message">{error.address}</div>
                            )} */}

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
                              type={showPassword ? "text" : "password"}
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

                            <span
                              className="eye-icon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <img
                                src={showPassword ? "eye.png" : "eye.png"}
                                alt="Toggle Password Visibility"
                                style={{
                                  position: "absolute",
                                  marginLeft: "222px",
                                  marginTop: "-45px",
                                  width: "20px",
                                  height: "20px",
                                }}
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
                            <Field
                              type="checkbox"
                              className="form-check-input"
                              id="mytc"
                              name="mytc"
                              checked={values.mytc}
                              onChange={(event) =>
                                handleCheckboxChange(event, setFieldValue)
                              }
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
                            <ErrorMessage
                              name="mytc"
                              component="div"
                              className="error-message"
                            />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto mt-3">
                          <button
                            type="submit"
                            className="btn btn-primary rounded-pill w-100"
                            style={{
                              cursor: checkboxChecked
                                ? "pointer"
                                : "not-allowed",
                            }}
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
                {error.general && (
                  <div className="alert alert-danger mt-3">{error.general}</div>
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
