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
  const { corp_id } = useParams(); 
  const navigate = useNavigate();

  // States for API data fetching
  const [plansData, setPlansData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
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


  const handleUpgrade = (id_plan, corp_id) => {
    console.log("Navigating with id_plan:", id_plan, "and corp_id:", corp_id);

    navigate(`/plan-details/${id_plan}/${corp_id}`);
  };

  useEffect(() => {
    if (!corp_id) {
      alert("corp_id is missing from the URL!");
    } else {
      fetchPlansData(); 
    }
  }, [corp_id]);


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
                    <span className="text-white mt-1 mx-4">
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
                </p>
              </div>

              <div className="container mt-5">
                <div className="row text-center">
                  {loading && <p>Loading...</p>}
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {plansData.length > 0 ? (
                    plansData.map((plan, index) => {
                      const planName = plan.name ? plan.name.toLowerCase() : "";
                      return (
                        <div key={index} className="col-lg-4 mb-2">
                          <div className="card shadow-sm" style={{ height: "420px" }}>
                            <div className="card-body">
                              <h5 className="card-title bg-primary text-white p-3">
                                {plan.plan_name}
                              </h5>
                              <br />
                              <FontAwesomeIcon
                                icon={icons[planName] || faUser}
                                style={{ fontSize: "50px", marginBottom: "15px" }}
                              />
                              <br />
                              <p className="card-text">
                                <strong>Total Cost :</strong> {plan.no_of_exam}
                              </p>
                              <p>
                                <strong>Discount :</strong> {plan.discount}%
                              </p>
                              <p>
                                <strong>Storage :</strong> {plan.total_storage} GB
                              </p>
                              <p>
                                <strong>Number of Exams : </strong>
                                {plan.no_of_exam}
                              </p>

                              <hr style={{ color: "grey" }} />

                           
                               <button
                  className="upgrade-button btn btn-primary"
                  onClick={() => handleUpgrade(plan.id, corp_id)}
                >
                  Upgrade to {plan.plan_name}
                </button>
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
