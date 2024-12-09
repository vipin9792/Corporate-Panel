import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee
} from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  useEffect(() => {
    const corpId = localStorage.getItem('corp_id'); // Get corp_id from localStorage

    if (!corpId) {
      setError('No company ID found. Please log in again.');
      alert('No company ID found. Please log in again.'); // Alert for missing corp_id
      return;
    }

    // Fetch profile data from the API
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },  // Pass corp_id in the request body
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`, // Use the provided Bearer token here
            },
          }
        );

        // Check if the API returned profile data successfully
        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Set profile data if successful
        } else {
          setError('Error fetching profile data.');
          alert('Error fetching profile data.'); // Alert if there's an error fetching data
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
        alert('Error fetching profile data.');  // Alert on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something went wrong
  }













  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
            <div className="layout-wrapper layout-content-navbar flex-grow-1">
                <div className="layout-container" style={{ position: "relative" }}>
                    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: "100vh", zIndex: 1 }}>
                        <div className="app-brand demo" style={{ background: "#1C4481" }}>
                            <a href="index.html" className="app-brand-link">
                                <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
                            </a>
                            <Link to="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                                <i className="bx bx-chevron-left bx-sm align-middle"></i>
                            </Link>
                        </div>
                        <div className="menu-inner-shadow"></div>
                        <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
                            <li className="menu-item active">
                                <Link to="/dashboard" className="menu-link text-decoration-none">
                                    <img src="dashboard-active.svg" alt="" className="menu-icon tf-icons bx bx-home-circle" />
                                    <div data-i18n="Analytics">Dashboard</div>
                                </Link>
                            </li>
                            <br />
                            <li>
                                <Link data-bs-toggle="collapse" data-bs-target="#collapseProfile" aria-expanded="false" aria-controls="collapseProfile" className="d-flex cursor-pointer text-decoration-none">
                                    <FontAwesomeIcon icon={faUserCircle} size="2x" className="mx-2" style={{ color: "white" }} />
                                    <span className="text-white mt-1">Profile <img src="down-arrow.png" alt="" width="30px" height="20px" /></span>
                                </Link>
                                <div className="collapse" id="collapseProfile">
                                    <ul>
                                        <li className="menu-item mt-2">
                                            <Link to="/ViewProfile" className="text-white text-decoration-none">
                                                <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                                            </Link>
                                        </li>
                                        <li className="menu-item my-2">
                                            <a href="#tr" className="text-white text-decoration-none">
                                                <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo Update
                                            </a>
                                        </li>
                                        <br />
                                    </ul>
                                </div>
                            </li>
                            <li className="menu-item">
                                <Link to="/" className="menu-link text-decoration-none">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} /><span className="mx-2 text-white"> Plan</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="menu-link mx-3 text-decoration-none">
                                    <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: "white" }} /> <span className="mx-2 text-white">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </aside>

        <div className="layout-page bg-white">
          <div className="container h-15vh">
            <div className="row mt-3 align-items-center">
              <div className="col-lg-8">
                <h4 className="fw-bold text-primary">
                  Dashborad/Corporate Profile
                </h4>
              </div>
              <div className="col-lg-4">
                <div className="row justify-content-end">
                  <div className="col-lg-6">
                    <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                      <img
                        src="d-user.svg"
                        alt="d-user"
                        className="img-fluid"
                        width="50px"
                      />
                      <h6 className="ms-2 mb-0 ">
                        <span className="text-primary lh-1">Welcome</span>{" "}
                        <br /> User TP
                        <a href="">
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            style={{
                              color: "grey",
                              position: "relative",
                              left: "25%",
                              marginBottom: "8px",
                              width: "35px",
                              height: "15px",
                            }}
                          />
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-1">
            <div className="row">
              <div class="container-fluid  h-85vh">
                <div class="content-wrapper h-100">
                  <div class="position-relative h-100 skyblue rounded p-3 mt-3">
                    <div class="hackthonProfile overflow-auto pe-2 h-100">
                      <div class=" bg-white">
                        <div class="row m-1">
                          <div class="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                            <div class="w-max">
                              
                              <div class="userEditWrapper">
                                <img
                                  src={profileData ? profileData.logo : "unknown-user.svg"}
                                  alt="dashboard-user"
                                  class="img-fluid"
                                />
                                <div class="userEditForm">
                                  <form action="#" id="editUserPicForm">
                                    <input
                                      type="file"
                                      class="d-none"
                                      id="editUserPic"
                                    />
                                    <label for="editUserPic">
                                      <img
                                        src="edit-user.svg"
                                        alt="userEditForm"
                                        width="25"
                                      />
                                    </label>
                                  </form>
                                </div>
                              </div>
                            </div>
                            
                             <Link
                              to="/EditProfile"
                              class="btn btn-primary m-0 rounded-pill text-white"
                            >
                              <img src="edit.svg" alt="edit" /> Edit
                            </Link> 
                          </div>
                        </div>
                        <div class="row mt-4 m-1">
                          <div class="col-lg-10">
                            <div class="row">


                              <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInput"
                                    required=""
                                    placeholder="Corporate Name"
                                    value={profileData ? profileData.company_name : ""}
                                    readOnly
                                  />
                                  <label for="floatingInput">
                                    <span>
                                      <img
                                        src="user.svg"
                                        alt="Banner title"
                                        class="img-fluid"
                                      />
                                    </span>{" "}
                                    Corporate Name
                                  </label>
                                </div>
                              </div>


                              <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInput"
                                    required=""
                                    placeholder="Email@email.com"
                                    value={profileData ? profileData.email : ""}
                                    readOnly
                                  />
                                  <label for="floatingInput">
                                    <span>
                                      <img
                                        src="email.svg"
                                        alt="Banner title"
                                        class="img-fluid"
                                      />
                                    </span>{" "}
                                    Email
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    value={profileData ? profileData.phone_number : ""}
                                    readOnly
                                  />
                                  <label for="floatingInput">
                                    <span>
                                      <img
                                        src="contact.svg"
                                        alt="Banner title"
                                        class="img-fluid"
                                      />
                                    </span>{" "}
                                    Corporate Mobile Number
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="floatingInput"
                                    required=""
                                    placeholder="Corporate Location"
                                    value={profileData ? profileData.address : ""}
                                    readOnly
                                    
                                  />
                                  <label for="floatingInput">
                                    <span>
                                      <img
                                        src="location.svg"
                                        alt="Banner title"
                                        class="img-fluid"
                                      />
                                    </span>{" "}
                                    Corporate Location
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Corporate User ID"
                                    required=""
                                    address
                                  />
                                  <label for="floatingInput">
                                    <span>
                                      <img
                                        src="banner-title.svg"
                                        alt="Banner title"
                                        class="img-fluid"
                                      />
                                    </span>
                                    Corporate User ID*
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-6 mb-3">
                                <div class="form-floating pass ">
                                  <input
                                    type="password"
                                    class="form-control"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    required=""
                                  />
                                  <label for="floatingPassword">
                                    <img
                                      src="email.svg"
                                      alt="pass"
                                      class="img-fluid position-absolute"
                                    />{" "}
                                    <span class="ms-4">Passward</span>
                                  </label>
                                  <a href="#icon" class="ms-auto">
                                    <img
                                      src="hide-pass.svg"
                                      id="Passwordicon"
                                      class="img-fluid"
                                    />
                                  </a>
                                </div>
                              </div>



                             



                              <div class="col-lg-12  mb-3">
                                <div class="row">
                                  <div class="col-lg-6">
                                    <a
                                      href="#"
                                      type="submit"
                                      class="btn btn-primary w-100 rounded-pill text-white"
                                    >
                                      Save
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  </div><br /><br /><br />
      <Footer/>
    </div>
  );
};

export default ViewProfile;
