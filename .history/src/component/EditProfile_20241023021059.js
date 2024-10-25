import React from "react";
import "./Dashboard.css"; // Import your custom CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const EditProfile = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <aside
          id="layout-menu"
          className="layout-menu menu-vertical menu bg-primary"
        >
          <div className="app-brand demo" style={{ background: "#1C4481" }}>
            <a href="index.html" className="app-brand-link">
              <img
                src="logo1.png"
                alt="dashboard-active"
                className="img-fluid"
              />
            </a>
            <Link
              href="/"
              className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
            >
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </Link>
          </div>
          <div className="menu-inner-shadow"></div>
          <ul
            className="menu-inner py-1 demo"
            style={{ background: "#1C4481" }}
          >
            <li className="menu-item active">
              <a href="dashboard.html" className="menu-link text-decoration-none">
                <img
                  src="dashboard-active.svg"
                  alt=""
                  className="menu-icon tf-icons bx bx-home-circle"
                />
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>
            <br />
            <li>
              <Link
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="d-flex cursor-pointer text-decoration-none"
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="2x"
                  className="mx-2"
                  style={{ color: "white" }}
                />
                <span className="text-white mt-1">
                  Profile&nbsp;&nbsp;&nbsp;{" "}
                  <img src="down-arrow.png" alt="" width="30px" height="20px" />
                </span>
              </Link>





              
              <div className="collapse" id="collapseExample">
                <ul>


                    
                   <li className="menu-item mt-2">
                    <Link to="/" className="text-white text-decoration-none">
                      <FontAwesomeIcon icon={faUserEdit} size="1x" />
                      &nbsp;&nbsp; View Profile
                    </Link>
                  </li> 
                  <li className="menu-item my-2">
                    <a href="#tr" className="text-white text-decoration-none">
                      <FontAwesomeIcon icon={faSync} size="1x" />
                      &nbsp;&nbsp;&nbsp;Logo Update
                    </a>
                  </li>
                  <br />
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link text-decoration-none">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="1x"
                  style={{ color: "white" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="text-white">Plan</div>
              </Link>
            </li>
            <li>
              <Link to="/" className="menu-link mx-3 text-decoration-none">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  size="1x"
                  style={{ color: "white" }}
                />
                &nbsp;&nbsp;&nbsp;
                <div className="text-white">Logout</div>
              </Link>
            </li>
          </ul>
        </aside>

        <div className="layout-page bg-white">
          <div className="container h-15vh">
            <div className="row mt-3 align-items-center">
              <div className="col-lg-8">
                <h4 className="fw-bold text-primary">
                  Edit Profile
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
                              <h6 class="text-center text-grey small">
                                Update Profile Image
                              </h6>
                              <div class="userEditWrapper">
                                <img
                                  src="unknown-user.svg"
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
                                    class="form-control"
                                    id="floatingInput"
                                    required=""
                                    placeholder="Corporate Mobile Number"
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
                                  <div class="col-lg-6 d-flex">
                                    <Link
                                      to="/"
                                      type="submit"
                                      class="btn btn-primary w-50 rounded-pill text-white"
                                    >
                                      Cancel
                                    </Link>&nbsp;<Link
                                      to="/"
                                      type="submit"
                                      class="btn btn-primary w-50 rounded-pill text-white"
                                    >
                                      Update
                                    </Link>
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
      </div>
    </div>
  );
};

export default EditProfile;
