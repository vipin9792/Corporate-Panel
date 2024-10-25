// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


import React from "react";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee ,} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
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
              <a href="dashboard.html" className="menu-link text-decoration-none" >
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
                    <Link to="/ViewProfile" className="text-white text-decoration-none">
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
              <a href="#" className="menu-link text-decoration-none">
                <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} />&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="text-white">Plan</div>
              </a>
            </li>
            <li>
              <a href="#" className="menu-link mx-3 text-decoration-none">
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
                <h4 className="fw-bold text-warning">Dashboard</h4>
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
            <div className="alert " role="alert" style={{ background: "#EDF2FF", borderRadius: "10px" }}>
              <h4 className="">Active Plan Free</h4>
              <p>Your current plan is the Free Plan. Upgrade to a premium plan for more features!</p>
              <a href="#" className="btn btn text-white" style={{ background: "#1C4481" }}>Upgrade Plan</a>
            </div>

            <div className="row">
              {/* Card 1: Total Hackathon */}
              <div className="col-md-4 mb-4 rounded-lg">
                <span href="#" className="card text-center card-light-blue" style={{ background: "#4775d1", borderRadius: "22px" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="flex-grow-1 text-start">
                      <img src="batch.svg" alt="" />
                      <h5 className="card-title my-2 text-white fs-5" style={{ width: "110px" }}>Total Hackathon</h5>
                    </div>
                    <div className="card-data text-start">
                      <span className="fs-2 text-white">10</span>
                    </div>
                  </div>
                  <div className="mb-4 my-2">
                    <button className="btn btn-light border-secondary">View Details</button>
                  </div>
                </span>
              </div>

              {/* Card 2: Free Hackathon */}
              <div className="col-md-4 mb-4">
                <a href="exams.html" className="card text-center card-light-green text-decoration-none" style={{ background: '#004d4d', borderRadius: "22px" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="flex-grow-1 text-start">
                      <img src="candidate.svg" alt="" />
                      <h5 className="card-title my-2 text-white fs-5" style={{ width: "110px" }}>Free Hackathon</h5>
                    </div>
                    <div className="card-data text-start">
                      <span className="fs-2 text-white">8</span>
                    </div>
                  </div>
                  <div className="mb-4 my-2">
                    <button className="btn btn-light border-secondary">View Details</button>
                  </div>
                </a>
              </div>

              {/* Card 3: Paid Hackathon */}
              <div className="col-md-4 mb-4">
                <span href="batches.html" className="card text-center card-light-yellow" style={{ background: '#d966ff', borderRadius: "22px" }}>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="flex-grow-1 text-start">
                      <img src="exam.svg" alt="" />
                      <h5 className="card-title my-2 text-white fs-5" style={{ width: "110px" }}>Paid Hackathon</h5>
                    </div>
                    <div className="card-data text-start">
                      <span className="fs-2 text-white">5</span>
                    </div>
                  </div>
                  <div className="mb-4 my-2">
                    <button className="btn btn-light border-secondary">View Details</button>
                  </div>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="card text-center" style={{ background: 'rgba(0, 0, 139, 0.3)' }}>
                  <div className=" text-white p-2" style={{ background: 'rgba(0, 0, 139, 0.3)' }}>
                    Assessment Console
                  </div>
                  <div className="card-body" style={{ background: 'rgba(0, 0, 139, 0.3)' }}>
                    <button type="submit" className="btn btn-danger border-secondary text-bold p-2" style={{ marginTop: "-17px", background: "#1C4481" }}>Assess Assessment Console</button>
                    <p className="card-text mb-5 text-white ">Manage users, exams, and settings</p>
                  </div>
                </div>
              
              </div>
           









              <footer className="bg-dark text-light pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-3">
            <h3 className=''>SPIWD</h3>
            <ul className="list-unstyled">
              <li>
                <a href="tel:(010) 1234 4321" className="text-light">
                  <FontAwesomeIcon icon={faPhone} /> (010) 1234 4321
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> 1 / 105 Bay Lights, <br />Lorem Ipsum, <br />LIC 3201
              </li>
            </ul>
            <a href="#" className="btn btn-danger">Book Now</a>
          </div>
          <div className="col-md-6 col-lg-2 mb-3">
            <h4>Page Links</h4>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Home</a></li>
              <li><a href="#" className="text-light">About</a></li>
              <li><a href="#" className="text-light">Testimonial</a></li>
              <li><a href="#" className="text-light">Blog</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-3">
            <h4>More Info</h4>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Lorem ipsum</a></li>
              <li><a href="#" className="text-light">Dolor sit amet</a></li>
              <li><a href="#" className="text-light">Consectetur Adipisicing</a></li>
              <li><a href="#" className="text-light">Ed do eiusmod tempor incididunt</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <h4>Open Hours</h4>
            <ul className="list-unstyled">
              <li><FontAwesomeIcon icon={faClock} /> Monday - Thursday: 9:00am - 5:00pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Friday: 9:00am - 4:00pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Saturday: 9:00am - 1:30pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Sunday: 9:30am - 12:00pm</li>
            </ul>
            <div className="footer-social mt-3">
              <a href="#" className="text-light me-2"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="text-light me-2"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="text-light"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-sm-4">
            <a href="#" className="text-light">Privacy Policy</a>
          </div>
          <div className="col-sm-8 text-end">
            <p className="mb-0">Lorem ipsum dolor sit amet @ 2019 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>














              {/* <footer className="bg-primary  h-50 text-center text-white rounded-sm p-3 ">SPWID Copyright © 2021 Inferno - All rights reserved || Designed By: Spiwd</footer> */}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
