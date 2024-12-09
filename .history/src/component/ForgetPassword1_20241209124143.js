import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { forgetPasswordApi } from "../Api Folder/forgetPasswordApi";
import Slider from "./Slider";

const ForgetPassword1 = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = async (values) => {
    const { email } = values;

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      const response = await forgetPasswordApi(email); // Use the API function

      console.log("Forget Password API Response:", response);

      if (response.code === 1000) {
        setMessage("Please check your email for reset instructions.");
   
        setTimeout(() => {
          navigate(`/ResetPassword1/${response.token}/${response.corp_id}`);
        }, 3000); 
      } else {
        setError(response.message || "An error occurred.");
      }
    } catch (err) {
      setError(
        err.message || "An error occurred while processing your request."
      );
    }
  };

  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img
                  src="logo1.png"
                  alt="logo"
                  id="logo"
                  style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
                />
                <img src="pen-scale.svg" alt="bg-icon-1" />
                <img src="boy.svg" alt="boy" />
                <img src="bulb1.svg" alt="bulb1" />
                <img src="computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4
                    className="text-secondary"
                    style={{ marginLeft: "230px" }}
                  >
                    Forget <br /> <span className="text">Password</span>
                  </h4>
                </div>

                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-10 mx-auto my-2">
                          <div className="form-floating mb-3">
                            <Field
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              name="email"
                              placeholder=" "
                            />
                            <label
                              htmlFor="floatingInput"
                              className="label-with-icon"
                            >
                              <span>
                                <img src="user.svg" alt="Icon" />
                              </span>
                              Username/Email*
                            </label>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error-message"
                            />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating pass forgot">
                            <button
                              type="submit"
                              className="btn btn-primary text-white rounded-pill w-100 loginBtn"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Submitting..." : "Continue"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </div>

            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword1;
