import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, '8 chars min')
      .max(20, '20 chars max')
      .matches(/[A-Z]/, '1 uppercase')
      .matches(/[a-z]/, '1 lowercase')
      .matches(/[0-9]/, '1 number')
      .matches(/[\W_]/, '1 special char')
      .required('Required'),
  });

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
                <h4 className="text-secondary">Forget <br /> Passward</h4>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log('Form data', values);
                    // Handle login submission here
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
                        <div className="col-lg-10 mx-auto my-2">
                          <div className="form-floating mb-3">
                            <Field type="text" className="form-control" id="floatingInput" name="email" placeholder=" " required />
                            <label htmlFor="floatingInput" className="label-with-icon">
                              <span><img src="user.svg" alt="Icon"  /></span>Email*
                            </label>
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>
                        </div>



                 

                        <div className="col-lg-10 mx-auto">
                          <div className="form-floating pass forgot">
                            <button type="submit" className="btn btn-primary text-white rounded-pill w-100 loginBtn" disabled={isSubmitting}>
                              {isSubmitting ? 'Logging in...' : 'Login'}
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
              <div className="imageicon1 signupFormIcons">
                <img src="book.svg" alt="book" width="70px" height="100px" style={{ marginRight: "22px" }} />
                <img src="bulb2.svg" alt="support"  style={{ position:"absolute", left:"5%",top:"5%" ,width:"100px", height:"100px"}}/>
                <img src="student-icon.svg" alt="support" width="50px" height="50px" style={{ marginLeft: "612px" }} />
                <img src="gradutation-cap.svg" alt="graduation-cap" width="140px" height="140px" style={{ position: "absolute", left: "5%", top: "76%" }} />
                <img src="/online-exam.png" alt="puzzle"  style={{ position: "absolute", left: "78%", top: "68%" ,width:"150px", height:"150px"}} />
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
