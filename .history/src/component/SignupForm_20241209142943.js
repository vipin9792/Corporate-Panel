import React, { useState } from "react";
import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import SignupAPI from "../Api Folder/SignupAPI";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const SignupForm = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
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
    setError("");
    setSuccessMessage("");

    try {
      const response = await SignupAPI(values, BEARER_TOKEN);

      console.log("Response from API:", response);

      // Check for specific error codes from API response
      if (response.status === 200 && response.data.corp_id) {
        setSuccessMessage("Signup successful! Please verify OTP.");
        setCorpId(response.data.corp_id);
        toast.success("Signup successful! Please verify OTP.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });

        navigate(
          `/verify-otp?corpId=${response.data.corp_id}&email=${values.emailId}`
        );
      } else if (response.data.code === 1001) {
        // If the email is already registered, show the appropriate error message
        setError(response.data.status); // "Email already Registered!!"
        toast.error(response.data.status, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      } else {
        // Handle other errors returned by the API
        setError("Signup failed. Please try again.");
        toast.error("Signup failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
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
    <div className="signup-form-container">
      <section>
        <div className="row">
          <div className="col-lg-6 bg-primary text-white d-flex justify-content-center align-items-center">
            <div className="imageicon">
              <img
                src="logo1.png"
                alt="logo"
                id="logo"
                style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
              />
            </div>
          </div>
          <div className="col-lg-6 p-4">
            <div className="form-container">
              <h4 className="text-center mb-3">Create An Account</h4>
              <div className="form-wrapper">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange, handleBlur, values, setFieldValue }) => (
                    <Form>
                      <div className="form-group mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          id="companyName"
                          name="companyName"
                          placeholder="Company Name"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="companyName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <Field
                          type="email"
                          className="form-control"
                          id="emailId"
                          name="emailId"
                          placeholder="Email"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="emailId"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <Field
                          type="tel"
                          className="form-control"
                          id="phoneNo"
                          name="phoneNo"
                          placeholder="Phone Number"
                          onBlur={handleBlur}
                          maxLength="10"
                        />
                        <ErrorMessage
                          name="phoneNo"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="Address"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          id="userid"
                          name="userid"
                          placeholder="User ID"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="userid"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <Field
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="passwd"
                          name="passwd"
                          placeholder="Password"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="passwd"
                          component="div"
                          className="text-danger"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="toggle-password"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="mytc"
                          checked={checkboxChecked}
                          onChange={(e) =>
                            handleCheckboxChange(e, setFieldValue)
                          }
                        />
                        <label htmlFor="mytc" className="form-check-label">
                          Accept Terms & Conditions
                        </label>
                        <ErrorMessage
                          name="mytc"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {error && (
                        <div className="text-danger mb-3">{error}</div>
                      )}

                      {successMessage && (
                        <div className="text-success mb-3">{successMessage}</div>
                      )}

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={loading}
                        >
                          {loading ? "Loading..." : "Create Account"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
