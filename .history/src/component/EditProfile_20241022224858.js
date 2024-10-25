import React from "react";
import './Dashboard.css'; // Import your custom CSS for styling
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faSync } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary">
          <div className="app-brand demo" style={{ background: "#1C4481" }}>
            <a href="index.html" className="app-brand-link">
              <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
            </a>
            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>
          <div className="menu-inner-shadow"></div>
          <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
            <li className="menu-item active">
              <a href="dashboard.html" className="menu-link">
                <img src="dashboard-active.svg" alt="" className="menu-icon tf-icons bx bx-home-circle" />
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>
            <br />
            <li>
              <a data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" className="d-flex cursor-pointer">
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="mx-2" style={{ color: "white" }} />
                <span className="text-white mt-1">Profile&nbsp;&nbsp;&nbsp; <img src="down-arrow.png" alt="" width="30px" height="20px" /></span>
              </a>
              <div className="collapse" id="collapseExample">
                <ul>
                  <li className="menu-item mt-2">
                    <a href="#dfs" className="text-white">
                      <FontAwesomeIcon icon={faUserEdit} size="1x" />
                      &nbsp;&nbsp; Edit Profile
                    </a>
                  </li>
                  <li className="menu-item my-2">
                    <a href="#tr" className="text-white">
                      <FontAwesomeIcon icon={faSync} size="1x" />
                      &nbsp;&nbsp;&nbsp;Logo Update
                    </a>
                  </li>
                  <br />
                </ul>
              </div>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">
                <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="text-white">Plan</div>
              </a>
            </li>
            <li>
              <a href="#" className="menu-link mx-3">
                <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;
                <div className="text-white">Logout</div>
              </a>
            </li>
          </ul>
        </aside>

        <div className="layout-page bg-white">
          <div className="container h-15vh">
            <div className="row mt-3 align-items-center">
              <div className="col-lg-8">
                <h4 className="fw-bold text-primary">Dashboard</h4>
              </div>
              <div className="col-lg-4">
                <div className="row justify-content-end">
                  <div className="col-lg-6">
                    <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                      <img src="d-user.svg" alt="d-user" className="img-fluid" width="50px" />
                      <h6 className="ms-2 mb-0 ">
                        <span className="text-primary lh-1">Welcome</span> <br /> User TP
                        <a href="">
                          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "grey", position: "relative", left: "25%", marginBottom: "8px", width: "35px", height: "15px" }} />
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
             {/* content */}



            </div>

          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
