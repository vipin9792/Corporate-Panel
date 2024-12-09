import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [corpId, setCorpId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract the corpId from the URL query string
    const params = new URLSearchParams(location.search);
    const corpId = params.get('corpId');
    
    if (corpId) {
      setCorpId(corpId);
      // Optionally, fetch profile data or handle dashboard logic based on corpId
    } else {
      setError('corpId is missing!');
      navigate('/signup'); // Redirect to signup or a login page
    }
  }, [location.search, navigate]);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <Link to="/signup">Go to Signup</Link>
      </div>
    );
  }

  return (
    <>
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
                <div className="alert" role="alert" style={{ background: "#EDF2FF", borderRadius: "10px" }}>
                  <h4 className="">Active Plan Free</h4>
                  <p>Your current plan is the Free Plan. Upgrade to a premium plan for more features!</p>
                  <Link to="/UpgradePlan" className="btn btn text-white" style={{ background: "#1C4481" }}>Upgrade Plan</Link>
                </div>

                {/* Dashboard cards and other content */}
                <div className="row">
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

                  {/* More cards here */}
                </div>

                {/* Additional content */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
