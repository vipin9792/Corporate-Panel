import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBriefcase, faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpgradePlan = () => {
  const { corp_id } = useParams();

  // Ensure corp_id is available
  useEffect(() => {
    if (!corp_id) {
      alert("corp_id is missing from the URL!");
      console.log("Error: corp_id is undefined");
    } else {
      console.log("Corp ID from URL:", corp_id);
    }
  }, [corp_id]);

  const [isYearly, setIsYearly] = useState(false);
  const [plansData, setPlansData] = useState([]);  // State to store the plans data
  const [loading, setLoading] = useState(true);  // State to track loading status

  useEffect(() => {
    const fetchPlansData = async () => {
      const token = localStorage.getItem('authToken');  // Retrieve token from storage (or state)

      if (!token) {
        alert("Authorization token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://103.35.121.219:4000/corp/subscription/fetchAllPlans/plan', {}, {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the Authorization header
          }
        });

        setPlansData(response.data);
        setLoading(false);
        console.log("Plans data fetched successfully:", response.data);
        alert("Plans data fetched successfully!");
      } catch (error) {
        console.error("Error fetching the plans:", error);

        // Handle specific error status codes
        if (error.response) {
          if (error.response.status === 404) {
            alert("The requested data was not found. Please check the endpoint or try again later.");
          } else if (error.response.status === 401) {
            alert("Unauthorized! Please check your token or log in again.");
            // Optionally redirect to login page or refresh token here
          } else if (error.response.status === 403) {
            alert("Forbidden! You do not have permission to access this resource.");
          } else {
            alert("An error occurred while fetching the data.");
          }
        } else {
          alert("An error occurred. Please check your internet connection.");
        }

        setLoading(false);
      }
    };

    fetchPlansData();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>;  // Show loading message until data is fetched
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
                  <Link to={`/dashboard/${corp_id}`} className="menu-link text-decoration-none">
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
                        <Link to={`/ViewProfile/${corp_id}`} className="text-white text-decoration-none">
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
                          <h6 className="ms-2 mb-0 "><span className="text-primary lh-1">Welcome</span>{" "}User TP
                            <a href="">
                              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "grey", position: "relative", left: "25%", marginBottom: "8px", width: "35px", height: "15px" }} />
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
                  {plansData.map((plan) => (
                    <div className="col-md-4 mb-4" key={plan.id}>
                      <div className="card" style={{
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "15px",
                        boxShadow: "0 4px 25px rgba(0, 0, 0, 0.1)"
                      }}>
                        <div className="card-body">
                          <h5 className="card-title">{plan.name}</h5>
                          <p>{plan.description}</p>
                          <button className="btn btn-primary">Select</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UpgradePlan;
