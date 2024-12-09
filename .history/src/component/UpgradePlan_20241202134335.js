import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faBriefcase, faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const UpgradePlan = () => {
  const { corp_id } = useParams(); // Get the corp_id from URL params

  const [plansData, setPlansData] = useState([]); // To store fetched plans
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To store error messages
  const [planDetails, setPlanDetails] = useState(null); // To store detailed plan information
  const [selectedPlanId, setSelectedPlanId] = useState(null); // To store selected plan ID for fetching details
  
  // Static data for icons
  const icons = {
    basic: faUser,
    standard: faUsers,
    premium: faBriefcase,
    enterprise: faUser,
    business: faUsers,
    pro: faBriefcase,
  };

  // Fetch plans data from API
  const fetchPlansData = async () => {
    setLoading(true); // Set loading to true when fetch starts
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/fetchAllPlans",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`,
          },
        }
      );

      if (response.data.code === 1000) {
        setPlansData(response.data.plans); // Store the fetched plans in state
      } else {
        setError("Failed to fetch plans data. Unexpected server status.");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("An error occurred while fetching plans data.");
    } finally {
      setLoading(false); // End loading once fetch is complete
    }
  };

  // Fetch plan details based on selected plan ID
  const fetchPlanDetails = async () => {
    if (!selectedPlanId) return;

    setLoading(true); // Set loading to true when fetch starts
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/fetchPlanDetails",
        { corp_id, id: selectedPlanId },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
`,
          },
        }
      );

      if (response.data.code === 1000) {
        setPlanDetails(response.data.plan); // Store the fetched plan details in state
      } else {
        setError("Failed to fetch plan details. Unexpected server status.");
      }
    } catch (error) {
      console.error("Error fetching plan details:", error);
      setError("An error occurred while fetching plan details.");
    } finally {
      setLoading(false); // End loading once fetch is complete
    }
  };

  useEffect(() => {
    fetchPlansData(); // Fetch the plans data when the component loads
  }, [corp_id]);

  // Handle button click to fetch details for a specific plan
  const handleFetchPlanDetails = (planId) => {
    setSelectedPlanId(planId); // Store selected plan ID
    fetchPlanDetails(); // Fetch the plan details for the selected plan
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
                {/* Other menu items */}
                <li className="menu-item">
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
                </p>
              </div>

              <div className="container mt-5">
                <div className="row text-center">
                  {loading && <p>Loading...</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {plansData.length > 0 ? (
                    plansData.map((plan, index) => (
                      <div key={index} className="col-lg-4 mb-2">
                        <div
                          className="card shadow-sm"
                          style={{ height: "420px" }}
                        >
                          <div className="card-body">
                            <h5 className="card-title bg-primary text-white p-3">
                              {plan.plan_name}
                            </h5>
                            <FontAwesomeIcon
                              icon={icons.basic}
                              style={{ fontSize: "50px", marginBottom: "15px" }}
                            />
                            <p className="card-text">
                              <strong>Total Cost:</strong> {plan.no_of_exam}
                            </p>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleFetchPlanDetails(plan.id)}
                            >
                              View Plan Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No plans available</p>
                  )}
                </div>
              </div>

              {planDetails && (
                <div className="container mt-5">
                  <h3>Plan Details</h3>
                  <p><strong>Plan Name:</strong> {planDetails.plan_name}</p>
                  <p><strong>Total Cost:</strong> {planDetails.total_cost}</p>
                  <p><strong>Discount:</strong> {planDetails.discount}%</p>
                  <p><strong>Total Storage:</strong> {planDetails.total_storage} GB</p>
                  <p><strong>No of Exams:</strong> {planDetails.no_of_exam}</p>
                  <h5>Features</h5>
                  <ul>
                    {planDetails.features.map((feature, index) => (
                      <li key={index}>{feature.subscription_display_name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradePlan;
