import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
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
import { fetchPlansData } from "../Api Folder/UpgradePlanApi";

const UpgradePlan = () => {
  const { corp_id } = useParams();
  const navigate = useNavigate();

  const [plansData, setPlansData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const icons = {
    basic: faUser,
    standard: faUsers,
    premium: faBriefcase,
    enterprise: faUser,
    business: faUsers,
    pro: faBriefcase,
  };

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);

    try {
      const plans = await fetchPlansData(corp_id);
      setPlansData(plans);
    } catch (error) {
      setError("Failed to fetch plans data. Please try again later.");
    } finally {
      setLoading(false);
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
      fetchPlans();
    }
  }, [corp_id]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
           <Navbar/>

            <div className="layout-page bg-white">
            <div className="container h-15vh">
  <div className="row mt-3 align-items-center">
    <div className="col-lg-8">
      <h4 className="fw-bold text-primary">Dashboard</h4>
    </div>
    <div className="col-lg-4" >
      <div className="row justify-content-end">
        <div className="col-lg-6" style={{width:"250px"}}>
          <div className="border rounded-pill  d-flex align-items-center upDashboard">
            <img
              src="../d-user.svg"
              alt="d-user"
              className="img-fluid"
              width="50px"
            />
            <h6 className="ms-2 mb-0">
              <span className="text-primary lh-1">Welcome
              <br /> User TP </span>
              {/* Dropdown for options */}
              <div className="dropdown d-inline">
                <button
                  className="btn btn-link  "
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
             <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                      color: "grey",
                      width: "20px",
                      height: "20px",
                    }}
                  />  
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {/* View Profile */}
                  <li>
                    <Link className="dropdown-item"  to={`/ViewProfile/${corp_id}`}>
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      View Profile
                    </Link>
                  </li>
                  {/* Change Password */}
                  <li>
                    <Link className="dropdown-item" to={`/ChangePassword/${corp_id}`}>
                      <FontAwesomeIcon
                        icon={faKey}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      Change Password
                    </Link>
                  </li>
                  {/* Logout */}
                  <li>
                    <a className="dropdown-item" href="#">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      Logout
                    </a>
                  </li>

                  
                </ul>
                <Link to="">
                              <FontAwesomeIcon icon={faSignOutAlt} style={{color: "grey", width: "25px", height: "15px",}}/>
                            </Link>
              </div> 
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
                          <div
                            className="card shadow-sm"
                            style={{ height: "460px" }}
                          >
                            <div className="card-body">
                              <h5 className="card-title bg-primary text-white p-3">
                                {plan.plan_name}
                              </h5>
                              <br />
                              <FontAwesomeIcon
                                icon={icons[planName] || faUser}
                                style={{
                                  fontSize: "50px",
                                  marginBottom: "15px",
                                }}
                              />
                              <br />
                              <p className="card-text">
                                <strong>Total Cost :</strong> {plan.total_cost}
                              </p>
                              <p>
                                <strong>Discount :</strong> {plan.discount}%
                              </p>
                              <p>
                                <strong>Time Limit :</strong> {plan.time_limt}
                              </p>
                              <p>
                                <strong>Storage :</strong> {plan.total_storage}{" "}
                                GB
                              </p>
                              <p>
                                <strong>Number of Exams : </strong>{" "}
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
