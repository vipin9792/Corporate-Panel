import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';

const ForgetPassword1 = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // The Bearer token provided
  const token = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email } = values;

    // Check if email is provided
    if (!email) {
      setError('Email is required');
      setSubmitting(false);
      return;
    }

    try {
      // API call for forget password
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/forgetPassword', // ForgetPassword API endpoint
        { email }, // Sending email as the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the provided Bearer token in the Authorization header
          },
        }
      );

      console.log('Forget Password API Response:', response);

      if (response.data.code === 1000) {
        setMessage('Please check your email for reset instructions.');

        // Redirect back to the login page after success
        setTimeout(() => {
          navigate('/LoginForm'); // Redirect to login page after 3 seconds
        }, 3000); // Delay for 3 seconds to show success message
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (err) {
      console.error('Error in ForgetPassword API:', err);
      setError('An error occurred while processing your request.');
    }

    setSubmitting(false);
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
                  <Link to="/LoginPage" className="btn-primary rounded-circle goBack">
                    <img src="arrow-left.svg" alt="go back" />
                  </Link>
                  <h4 className="text-secondary text-end">Forget <br /> <span className="text">Password</span></h4>
                </div>

                <Formik
                  initialValues={{ email: '' }}
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
                              required
                            />
                            <label htmlFor="floatingInput" className="label-with-icon">
                              <span><img src="user.svg" alt="Icon" /></span>Username/Email*
                            </label>
                            <ErrorMessage name="email" component="div" className="error-message" />
                          </div>
                        </div>

                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating pass forgot">
                            <button
                              type="submit"
                              className="btn btn-primary text-white rounded-pill w-100 loginBtn"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Submitting...' : 'Continue'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
<Slider/>
            {/* <div className="col-lg-6 bg-white bg-icons-right">
              <div className="imageicon1 signupFormIcons">
                <img src="book.svg" alt="book" width="70px" height="100px" style={{ marginRight: "22px" }} />
                <img src="bulb2.svg" alt="support" style={{ position: "absolute", left: "5%", top: "5%", width: "100px", height: "100px" }} />
                <img src="student-icon.svg" alt="support" width="50px" height="50px" style={{ marginLeft: "612px" }} />
                <img src="gradutation-cap.svg" alt="graduation-cap" width="140px" height="140px" style={{ position: "absolute", left: "5%", top: "76%" }} />
                <img src="/online-exam.png" alt="puzzle" style={{ position: "absolute", left: "78%", top: "68%", width: "150px", height: "150px" }} />
              </div>

              <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ width: "400px", margin: "auto", top: "21%", borderRadius: "24px" }}>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="item-1.svg" className="d-block w-100" width="300px" height="300px" alt="First slide" />
                    <div className="carousel-content text-center">
                      <h5>First Slide Title</h5>
                      <p>This is some description for the first slide.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="item-2.svg" className="d-block w-100" alt="Second slide" width="300px" height="300px" />
                    <div className="carousel-content text-center">
                      <h5>Second Slide Title</h5>
                      <p>This is some description for the second slide.</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="item-3.svg" className="d-block w-100" alt="Third slide" width="300px" height="300px" />
                    <div className="carousel-content text-center">
                      <h5>Third Slide Title</h5>
                      <p>This is some description for the third slide.</p>
                    </div>
                  </div>
                </div>

                <div className="carousel-buttons text-center">
                  <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <i className="bi bi-chevron-left text-white fs-6"></i>
                  </button>&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <i className="bi bi-chevron-right text-white fs-6"></i>
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword1;
