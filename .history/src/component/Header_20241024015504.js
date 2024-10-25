import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
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
                      <FontAwesomeIcon icon={faCoffee} size="1x" />
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


				
				
				
            <div class="container-fluid  h-85vh">
                    {/* <!-- Content wrapper --> */}
                    
                </div>
				
				
           
				
			


                {/* <!-- Content wrapper --> */}
            </div>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
                {/* <!-- / Navbar --> */}
                
            {/* <!-- / Layout page --> */}
        </div>

        {/* <!-- Overlay --> */}
    </div>
	
	
	
	
	



      
    
   </>
  )
}

export default Header
