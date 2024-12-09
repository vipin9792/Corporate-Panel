import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [corpId, setCorpId] = useState(null); // State to store corpId
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch corpId dynamically
  const fetchCorpId = async () => {
    try {
      const response = await fetch('/api/getCorpId');  // Your actual endpoint here
      const data = await response.json();
      console.log("Fetched data:", data); // Debugging to see the response

      
      if (data && data.corpId) {
        setCorpId(data.corpId); // Set the corpId dynamically
      } else {
        console.error('Corp ID not found!');
      }
    } catch (error) {
      console.error('Error fetching corpId:', error);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  useEffect(() => {
    fetchCorpId(); // Call fetchCorpId when the component mounts
  }, []);

  // Show loading state until corpId is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Current corpId:", corpId);  // Debugging to check if corpId is available

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
                        {/* Check if corpId exists */}
                        {corpId ? (
                          <Link to={`/ViewProfile?corpId=${corpId}`} className="text-white text-decoration-none">
                            <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                          </Link>
                        ) : (
                          <span>Loading...</span> // Display Loading... if corpId is still null
                        )}
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
              {/* Additional content */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
