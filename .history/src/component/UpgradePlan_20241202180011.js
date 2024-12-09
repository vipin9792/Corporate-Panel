import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import Footer from "./Footer";

const UpgradePlan = () => {
  const { corp_id } = useParams(); // Get the corp_id from URL params
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // States for API data fetching
  const [plansData, setPlansData] = useState([]); // To store fetched plans
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To store error messages

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
      // API request to fetch subscription plans data
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/fetchAllPlans",
        { corp_id: corp_id }, // Pass the corp_id from URL
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      // Log the response data
      console.log("API Response:", response.data);

      // Handle successful response
      if (response.data.code === 1000) {
        setPlansData(response.data.plans); // Store the fetched plans in state
      } else {
        setError("Failed to fetch plans data. Unexpected server status.");
      }
    } catch (error) {
      // Log the error
      console.error("Error fetching plans:", error);

      if (error.response) {
        setError(
          `Failed to fetch plans data. Server responded with status ${error.response.status}`
        );
      } else if (error.request) {
        setError("Failed to fetch plans data. No response from server.");
      } else {
        setError("An error occurred while setting up the request.");
      }
    } finally {
      setLoading(false); // End loading once fetch is complete
    }
  };

  // Fetch the plans data when the component mounts
  useEffect(() => {
    if (!corp_id) {
      alert("corp_id is missing from the URL!");
    } else {
      fetchPlansData(); // Fetch the data
    }
  }, [corp_id]);

  // Function to handle upgrading a plan
  const handleUpgrade = (id_plan, corp_id) => {
    // Log the id_plan and corp_id for debugging
    console.log("Navigating with id_plan:", id_plan, "and corp_id:", corp_id);

    // Navigate to the PlanDetails page with both id_plan and corp_id
    navigate(`/plan-details/${id_plan}/${corp_id}`);
  };

  // UI rendering
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

              <div className="container">
                <div className="row mt-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    plansData.map((plan) => (
                      <div className="col-md-4 mb-4" key={plan.id_plan}>
                        <div
                          className="card shadow-lg rounded-pill border-0"
                          style={{ width: "auto", height: "auto" }}
                        >
                          <div className="card-body text-center">
                            <FontAwesomeIcon
                              icon={icons[plan.name.toLowerCase()]}
                              size="3x"
                              style={{ color: "#1C4481" }}
                            />
                            <h5 className="text-primary my-3">{plan.name}</h5>
                            <p>{plan.description}</p>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() =>
                                handleUpgrade(plan.id_plan, corp_id)
                              }
                            >
                              Upgrade
                            </button>
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
        <Footer />
      </div>
    </>
  );
};

export default UpgradePlan;
