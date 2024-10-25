import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log('Form data:', values);
  };

  return (
    <section>
      <div className="row credential">
        <div className="col-lg-6 bg-primary text-white bg-icons"><br/><br/>
          <div className="imageicon">
            <img src="logo1.png" alt="logo" id="logo" className='demo_sec'/>
            <img src="pen-scale.svg" alt="" />
            <img src="boy.svg" alt="boy" />
            <img src="bulb1.svg" alt="bg-icon-3" />
            <img src="computer-person.svg" alt="bg-icon-8" />
          </div>
          <div className="wrapper-inner mt-5">
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, values }) => (
                <Form
                  className="bg-white signupForm"
                  style={{
                    maxWidth: '320px',
                    borderRadius: '20px',
                    height: '310px',
                    margin: 'auto',
                    padding: '20px',
                    marginTop: '104px',
                    overflow: 'hidden'
                  }}
                >
                  <div className="row">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                      <Link to="/LoginPage" className="btn-primary rounded-circle goBack">
                        <img src="arrow-left.svg" alt="go back" />
                      </Link>
                      <h4 className=" text-end">Forget <br /> <span className="text-primary">Password</span></h4>
                    </div>
                    <div className="col-lg-10 mx-auto my-2">
                      <div className="form-floating pass forgot">
                        <Field
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder=" "
                          required
                          onChange={handleChange}
                          value={values.email}
                        />
                        <label htmlFor="email" className="label-with-icon">
                          <span><img src="name.svg" alt="Icon" className="icon1" style={{ marginTop: "-2px" }} /></span> Username/Email
                        </label>
                        <ErrorMessage name="email" component="div" className="text-danger error-message" />
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <button type="submit" className="btn btn-primary rounded-pill w-100 text-white">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="col-lg-6 bg-white bg-icons-right">
          <h4>About <br /> <span className="fw-bold">Pareekshan</span></h4>
          <div className="imageicon1 signupFormIcons">
            <img src="book.svg" alt="book" width="70px" height="100px" style={{ marginRight: "-172px" }} />
            <img src="star-boy.svg" alt="star-boy" width="50px" height="50px" style={{ position: "absolute", left: "40%", top: "0%" }} />
            <img src="support.svg" alt="support" width="50px" height="50px" />
            <img src="gradutation-cap.svg" alt="gradutation-cap" width="50px" height="50px" />
            <img src="puzzle.svg" alt="puzzle" width="50px" height="100px" style={{ position: "absolute", left: "75%" }} />
          </div>

          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ width: "400px", margin: "auto", top: "20%", borderRadius: "24px" }}>
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

            <div className="carousel-buttons text-center mt-3">
              <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <i className="bi bi-chevron-left text-white fs-6"></i>
              </button>&nbsp;
              <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <i className="bi bi-chevron-right text-white fs-6"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
