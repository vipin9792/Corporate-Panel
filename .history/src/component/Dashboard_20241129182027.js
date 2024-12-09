import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { corp_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log("Fetching data for corp_id:", corp_id);

      // Make the API request
      const response = await axios.post(
        `http://103.35.121.219:4000/corp/dashboard/fetchDetail?corp_id=${corp_id}`,
        {
          headers: {
            Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"
          }
        }
      );

      // Log response for debugging
      console.log("Full Response:", response);

      if (response.data.code === 1000) {
        setData(response.data.detail);
      } else if (response.data.code === 1003) {
        setError("APP Token Mismatch or Broken. Please check the token.");
      } else {
        setError("Unexpected response code: " + response.data.code);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [corp_id]);

  return (
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
            <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
              <li className="menu-item active">
                <Link to="/" className="menu-link text-decoration-none">
                  <img
                    src="../dashboard-active.svg"
                    alt=""
                    className="menu-icon tf-icons bx bx-home-circle"
                  />
                  <div data-i18n="Analytics">Dashboard</div>
                </Link>
              </li>
              <br />
              <li>
                <Link
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseProfile"
                  aria-expanded="false"
                  aria-controls="collapseProfile"
                  className="d-flex cursor-pointer text-decoration-none"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="2x"
                    className="mx-2"
                    style={{ color: "white" }}
                  />
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
                  />{" "}
                  <span className="mx-2 text-white">Logout</span>
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
                        <img
                          src="../d-user.svg"
                          alt="d-user"
                          className="img-fluid"
                          width="50px"
                        />
                        <h6 className="ms-2 mb-0">
                          <span className="text-primary lh-1">Welcome</span> <br /> User TP
                          <FontAwesomeIcon
                            icon={faUserCircle}
                            style={{ color: "grey" }}
                          />
                          <a href="">
                            <FontAwesomeIcon
                              icon={faSignOutAlt}
                              style={{
                                color: "grey",
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

            <div className="container mt-1">
              {loading && <p>Loading...</p>}
              {error && <p className="text-danger">{error}</p>}
              {data && (
                <div className="alert" role="alert" style={{ background: "#EDF2FF", borderRadius: "10px" }}>
                  <h4>Active Plan Free</h4>
                  <p>Your current plan is the Free Plan. Upgrade to a premium plan for more features!</p>
                  <Link
                    to="/UpgradePlan"
                    className="btn btn text-white"
                    style={{ background: "#1C4481" }}
                  >
                    Upgrade Plan
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
