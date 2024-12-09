import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import Slider from "./Slider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialValues, setInitialValues] = useState({
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const corpId = new URLSearchParams(location.search).get("corpId"); // Get corp_id from query params

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  // Fetch profile data on component mount
  useEffect(() => {
    if (corpId) {
      fetchProfileData(corpId); // Fetch profile data using corp_id
    }
  }, [corpId]);

  const fetchProfileData = async (corpId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://103.35.121.219:4000/corp/profile/${corpId}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (response.status === 200) {
        setProfileData(response.data);  // Set the profile data
        setInitialValues({
          companyName: response.data.companyName || "",
          emailId: response.data.emailId || "",
          phoneNo: response.data.phoneNo || "",
          address: response.data.address || "",
          userid: response.data.userid || "",
          passwd: response.data.passwd || "",  // Assuming you want to show password field as well
          name: response.data.name || "",
        });
      } else {
        setError("Failed to load profile data.");
      }
    } catch (err) {
      setError("Error fetching profile data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Validation schema for form (even though the fields are readonly)
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
    passwd: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    name: Yup.string().required("Full Name is required"),
  });

  // Handle form submission (not needed for readonly, but you can add functionality to update if required)
  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://103.35.121.219:4000/corp/profile/${corpId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        navigate(`/view-profile?corpId=${corpId}`); // After update, navigate to the same page
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      setError("Error updating profile. Please try again later.");
      console.error(error);
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
                <h4 className="text-secondary text-end">
                  View Profile
                </h4>
              </div>
              {loading ? (
                <div>Loading profile...</div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <div className="wrapper-inner signupForm overflow-y-scroll overflow-hidden">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ handleChange, handleBlur, values }) => (
                      <Form className="bg-white" id="profileForm">
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
                                onChange={handleChange}
                                value={values.companyName}
                                readOnly
                              />
                              <label htmlFor="companyName">Company Name</label>
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
                                onChange={handleChange}
                                value={values.emailId}
                                readOnly
                              />
                              <label htmlFor="emailId">Email</label>
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
                                onChange={handleChange}
                                value={values.phoneNo}
                                readOnly
                              />
                              <label htmlFor="phoneNo">Phone Number</label>
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
                                onChange={handleChange}
                                value={values.address}
                                readOnly
                              />
                              <label htmlFor="address">Address</label>
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
                                onChange={handleChange}
                                value={values.userid}
                                readOnly
                              />
                              <label htmlFor="userid">User ID</label>
                            </div>
                          </div>

                          <div className="col-lg-10 mx-auto">
                            <div className="form-floating mb-3">
                              <Field
                                type="password"
                                className="form-control"
                                id="passwd"
                                name="passwd"
                                placeholder="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.passwd}
                                readOnly
                              />
                              <label htmlFor="passwd">Password</label>
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
                                onChange={handleChange}
                                value={values.name}
                                readOnly
                              />
                              <label htmlFor="name">Full Name</label>
                            </div>
                          </div>

                          {/* Optional: If you need to display the update button for a future edit option */}
                          {/* <div className="col-lg-10 mx-auto mt-3">
                            <button
                              type="submit"
                              className="btn btn-primary rounded-pill w-100"
                            >
                              {loading ? "Updating..." : "Update Profile"}
                            </button>
                          </div> */}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
          <Slider />
        </div>
      </section>
    </div>
  );
};

export default ViewProfilePage;
