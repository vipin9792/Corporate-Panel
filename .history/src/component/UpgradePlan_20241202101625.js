import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBriefcase, faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Footer from './Footer';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const UpgradePlan = () => {
  const { corp_id } = useParams();

  useEffect(() => {
    if (!corp_id) {
      alert("corp_id is missing from the URL!");
      console.log("Error: corp_id is undefined");
    } else {
      console.log("Corp ID from URL:", corp_id);
    }
  }, [corp_id]);

  const [plansData, setPlansData] = useState([]); // State to hold the fetched plans data
  const [loading, setLoading] = useState(false); // Loading state to show a loading indicator
  const [error, setError] = useState(null); // State to hold any error messages

  // Function to fetch subscription plans data from the API
  const fetchPlansData = async () => {
    setLoading(true);  // Set loading to true when the fetch starts
    setError(null);    // Reset any previous errors

    try {
      // API request to fetch subscription plans data
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/subscription/fetchAllPlans', 
        { corp_id: corp_id },  // Pass the actual corp_id from URL here
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`
          }
        }
      );
  
      // Log the full response for debugging
      console.log('API Response:', response.data);

      // Handle the successful response
      if (response.data.code === 1000) {
        // Successfully fetched the plans
        setPlansData(response.data.plans); // Store the plans in state
        console.log("Plans fetched successfully:", response.data.plans);
      } else {
        // If the code is not 1000, handle it as an error
        console.error('Error fetching plans, status:', response.data.status);
        setError('Failed to fetch plans data. Unexpected server status.');
      }

    } catch (error) {
      // Catch any errors that happen during the request
      console.error('Error during fetch:', error);

      if (error.response) {
        // If the server responded with a non-2xx status code
        console.error('Server responded with status:', error.response.status);
        setError(`Failed to fetch plans data. Server responded with status ${error.response.status}`);
      } else if (error.request) {
        // If no response was received from the server
        console.error('No response received:', error.request);
        setError('Failed to fetch plans data. No response from server.');
      } else {
        // General error during the setup of the request
        console.error('Request setup error:', error.message);
        setError('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false); // End loading once the fetch is completed
    }
  };

  // Fetch the plans data when the component mounts
  useEffect(() => {
    fetchPlansData(); // Trigger the fetch function when the component loads
  }, [corp_id]); // Dependency on corp_id

  const [isYearly, setIsYearly] = useState(false);

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
                    <h4 className="fw-bold text-primary">Upgraded Plan</h4>
                  </div>
                  <div className="col-lg-4">
                    <div className="row justify-content-end">
                      <div className="col-lg-6">
                        <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                          <img src="d-user.svg" alt="d-user" className="img-fluid" width="50px" />
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
              </div><br />

              <div className="hero demo_heo">
                <h1 className="display-5 lead">Choose Your Upgrade Plan</h1>
                <p className="lead">Find the perfect plan that fits your needs.</p>
              </div>

              <div className="container mt-5">
                <div className="row text-center">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                  ) : (
                    plansData.map((plan) => (
                      <div className="col-md-4 mb-4" key={plan.id_subscription}>
                        <div className="card" style={{
                          background: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "15px",
                          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.2)",
                          transition: "transform 0.3s, box-shadow 0.3s"
                        }}>
                          <div className="card-header" style={{
                            background: "#1C4481",
                            color: "white",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px"
                          }}>
                            <h3>{plan.subscription_display_name || plan.subscription_name}</h3>
                          </div>
                          <div className="card-body" style={{ padding: "30px" }}>
                            <div style={{ fontSize: "50px", marginBottom: "15px" }}>
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <h2 className="card-title">
                              {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                            </h2>
                            <p className="card-text">Features:</p>
                            <ul className="list-unstyled">
                              {Array.isArray(plan.feature_allow) && plan.feature_allow.map((feature, index) => (
                                <li key={index}>✔ {feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="card-footer" style={{
                            background: "#f8f9fa",
                            borderBottomLeftRadius: "15px",
                            borderBottomRightRadius: "15px"
                          }}>
                            <Link to="/" className="btn btn-primary">Choose Plan</Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpgradePlan;
