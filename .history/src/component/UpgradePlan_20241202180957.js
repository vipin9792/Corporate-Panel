import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUsers,
  faBriefcase,
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const UpgradePlan = () => {
  const { corp_id } = useParams(); // Extract corp_id from URL parameters
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  // State to hold plans data, loading state, and error state
  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch subscription plans data from the API
  const fetchPlansData = async () => {
    setLoading(true);  // Set loading state to true
    setError(null);    // Reset error state

    try {
      // Make the API request to fetch the plans
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/subscription/fetchAllPlans',
        { corp_id: corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      // Log the full response for debugging
      console.log('API Response:', response.data);

      // Handle the successful response
      if (response.data.code === 1000) {
        setPlansData(response.data.plans);  // Store plans data in state
      } else {
        // Handle error if response status is not 1000
        setError('Failed to fetch plans data. Unexpected server status.');
      }
    } catch (error) {
      // Handle errors that occur during the API request
      console.error('Error fetching plans:', error);
      setError('Failed to fetch plans data. Please try again later.');
    } finally {
      setLoading(false);  // Set loading to false after the API request completes
    }
  };

  // Fetch the plans data when the component mounts or when corp_id changes
  useEffect(() => {
    fetchPlansData();
  }, [corp_id]);

  // Function to handle upgrading a plan
  const handleUpgrade = (id_plan, corp_id) => {
    // Log the id_plan and corp_id for debugging
    console.log("Navigating with id_plan:", id_plan, "and corp_id:", corp_id);

    // Navigate to the PlanDetails page with both id_plan and corp_id
    navigate(`/plan-details/${id_plan}/${corp_id}`);
  };
  

  
  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              {/* Sidebar content */}
              <div className="app-brand demo" style={{ background: "#1C4481" }}>
                <a href="index.html" className="app-brand-link">
                  <img
                    src="../logo1.png"
                    alt="dashboard-active"
                    className="img-fluid"
                  />
                </a>
                <Link
                  to="/"
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
                {/* Menu items */}
                <li className="menu-item active">
                  <Link
                    to="/dashboard"
                    className="menu-link text-decoration-none"
                  >
                    <img
                      src="../dashboard-active.svg"
                      alt=""
                      className="menu-icon tf-icons bx bx-home-circle"
                    />
                    <div data-i18n="Analytics">Dashboard</div>
                  </Link>
                </li>
                <li>
                  <Link
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseProfile"
                    aria-expanded="false"
                    aria-controls="collapseProfile"
                    className="d-flex cursor-pointer text-decoration-none"
                  >
                    <span className="text-white mt-1">
                      Profile{" "}
                      <img
                        src="../down-arrow.png"
                        alt=""
                        width="30px"
                        height="20px"
                      />
                    </span>
                  </Link>
                  <div className="collapse" id="collapseProfile">
                    <ul>
                      <li className="menu-item mt-2">
                        <Link
                          to={`/ViewProfile/${corp_id}`}
                          className="text-white text-decoration-none"
                        >
                          <FontAwesomeIcon icon={faUserEdit} size="1x" /> View
                          Profile
                        </Link>
                      </li>
                      <li className="menu-item my-2">
                        <a
                          href="#tr"
                          className="text-white text-decoration-none"
                        >
                          <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo
                          Update
                        </a>
                      </li>
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
                    <span className="mx-2 text-white">Plan</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="menu-link mx-3 text-decoration-none">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white">Logout</span>
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
                          <img
                            src="../d-user.svg"
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

              <div className="hero demo_heo">
                <h1 className="display-5 lead">Choose Your Upgrade Plan</h1>
                <p className="lead">
                  Find the perfect plan that fits your needs.
                  Find the perfect plan that fits your needs.
                </p>
              </div>

              <div className="container mt-5">
                <div className="row text-center">
                  {loading && <p>Loading...</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {plansData.length > 0 ? (
                    plansData.map((plan, index) => {
                      // Check if plan.name exists before calling toLowerCase
                      const planName = plan.name ? plan.name.toLowerCase() : "";

                      return (
                        <div key={index} className="col-lg-4 mb-2">
                          <div
                            className="card shadow-sm"
                            style={{ height: "420px" }}
                          >
                            <div className="card-body">
                              <h5 className="card-title bg-primary text-white p-3">
                                {plan.plan_name}
                              </h5>
                              <br />
                          <FontAwesomeIcon icon={icons.basic}  style={{ fontSize: "50px", marginBottom: "15px" }}/> <br />
                              <p className="card-text">
                                <strong>Total Cost :</strong> {plan.no_of_exam}
                              </p>
                              <p>
                                <strong>Discount :</strong> {plan.discount}%
                              </p>
                              <p>
                                <strong>Storage :</strong> {plan.total_storage}{" "}
                                GB
                              </p>
                              <p>
                                <strong>Number of Exams : </strong>
                                {plan.no_of_exam}
                              </p>


                              {/* <p className="card-text text-center">
                                <strong>Feature</strong>
                              </p>

                              <p className="list-unstyled ">
                                {plan.features.map((feature) => (
                                  <div>
                                    <p
                                      key={feature.id_subscription}
                                      style={{ textAlign: "center" }}
                                    >
                                      {feature.subscription_display_name}
                                    </p>
                                  </div>
                                ))}
                              </p> */}
                              <hr style={{ color: "grey" }} />

                              {/* <a href={`/upgrade/${plan.plan_ref}`}>
                  <button className="upgrade-button btn btn-primary">
                    Upgrade to {plan.plan_name}
                  </button>
                </a> */}

                              <Link to={`/upgrade/${plan.plan_ref}`}>
                                <button className="upgrade-button btn btn-primary">
                                  Upgrade to {plan.plan_name}
                                </button>
                              </Link>
                              {/* <button className="btn btn-primary">Select Plan</button> */}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No plans available</p>
                  )}
                </div>
              </div>
              <br />
              <br />
              <br />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradePlan;
