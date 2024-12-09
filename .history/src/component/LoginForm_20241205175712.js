import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Slider from "./Slider";

// Import react-bootstrap components for modal
import { Modal, Button } from 'react-bootstrap';

const LoginForm = () => {

  function handleClick1() {
    toast("This is a toast message!");
  }

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // state to control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // store modal message

  // Validation schema for the login form
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/login", // API endpoint
        values,
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`, // Replace with the actual API key
          },
        }
      );

      if (response.data.code === 1000) {
        setMessage("Login successful!");
        setModalMessage("Login Successful!");
        setShowModal(true); // Show success modal

        const corpId = response.data.profile.id;
        navigate(`/Dashboard/${corpId}`);
      } else {
        setError("Invalid credentials. Please try again.");
        setModalMessage("Login Failed! Invalid credentials.");
        setShowModal(true); // Show error modal
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred during login.");
      setModalMessage("An error occurred during login.");
      setShowModal(true); // Show error modal
    }
    setSubmitting(false);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img src="logo1.png" alt="logo" id="logo" />
                <img src="pen-scale.svg" alt="bg-icon-1" />
                <img src="boy.svg" alt="boy" />
                <img src="bulb1.svg" alt="bulb1" />
                <img src="computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4 className="text-secondary" style={{ marginLeft: "222px" }}>
                    Corporate <br /> <span className="text">Login</span>
                  </h4>
                </div>

                {/* Formik with validation */}
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
                            <label htmlFor="floatingInput" className="label-with-icon">
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
                          <div className="form-floating mb-3">
                            <Field
                              type="password"
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
                            </div>
                            <ErrorMessage
                              name="password"
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

                {/* Show error or success message */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p>{message}</p>}
              </div>
            </div>

            <Slider />
          </div>
        </div>
      </section>

      {/* Modal for success/error message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage.includes('Failed') ? "Error" : "Success"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginForm;
