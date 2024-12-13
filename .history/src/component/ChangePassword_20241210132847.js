import React, { useState } from "react";


import { useNavigate, Link } from "react-router-dom";
import Slider from "./Slider";




const ChangePassword = () => {
 
  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 text-white bg-icons bg-primary">
              <div className="imageicon">
                <img
                  src="../logo1.png"
                  alt="../logo"
                  id="logo"
                  style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
                />
                <img src="../pen-scale.svg" alt="bg-icon-1" />
                <img src="../boy.svg" alt="boy" />
                <img src="../bulb1.svg" alt="bulb1" />
                <img src="../computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4
                    className="text-secondary"
                    style={{ marginLeft: "222px" }}
                  >
                    Corporate <br /> <span className="text">Login</span>
                  </h4>
                </div>

                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-10 mx-auto my-2">
                          <div className="form-floating mb-3">
                            <Field
                              type="email"
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
                          <div className="form-floating mb-3 position-relative">
                            <Field
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="floatingPassword"
                              name="password"
                              placeholder=" "
                            />
                            <label htmlFor="floatingPassword">
                              <span>
                                <img
                                  src="password.svg"
                                  alt="Icon"
                                  className="icon"
                                />
                              </span>
                              Password*
                            </label>
                            <div className="fogot-pass">
                              <Link
                                to="/ForgetPassword1"
                                className="text-decoration-none float-end"
                              >
                                Forgot Password?
                              </Link>

                              <span
                                onClick={togglePasswordVisibility}
                                className="eye-icon"
                              >
                                <img
                                  src={showPassword ? "eye.png" : "eye.png"}
                                  alt="eye-icon"
                                  width="20"
                                  style={{
                                    marginLeft: "242px",
                                    marginTop: "-114px",
                                  }}
                                />
                              </span>
                            </div>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error-message"
                              style={{ marginTop: "-38px" }}
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
                              {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                            <p className="mb-0">
                              <span className="text-secondary fw-semibold">
                                Not registered Yet?
                              </span>
                              &nbsp;
                              <Link
                                to="/SignupForm"
                                className="text-decoration-none"
                              >
                                Create an account
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </div>

            <Slider />
          </div>
        </div>
      </section>

      {/* Toast container for displaying toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
