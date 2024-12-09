import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; 
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

  // State to store the data and loading/error state
  const [data, setData] = useState({ exam: 0, batch: 0, student: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API when the component mounts or when the corp_id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for corp_id:", corp_id);

        // Make API call to fetch the data
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchDetail",
          { corp_id: corp_id },
          {
            headers: {
              Authorization:
                "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        console.log("API Response Data:", response.data);

        if (response.data.code === 1000) {
          // If the API response code is 1000, store the data
          setData(response.data.detail);
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

    fetchData();
  }, [corp_id]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            {/* Sidebar */}
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
                <li className="menu-item active">
                  <Link
                    to="/"
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
                    <span className="mx-2 text-white"> Plan</span>
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

            {/* Content Area */}
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
                            <span className="text-primary lh-1">Welcome</span>{" "}
                            <br /> User TP
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

              {/* Loading and error handling */}
              {loading && <p>Loading data...</p>}
              {error && <p className="text-danger">{error}</p>}

              {/* Displaying fetched data */}
              {!loading && !error && (
                <div className="container mt-1">
                  <div
                    className="alert "
                    role="alert"
                    style={{ background: "#EDF2FF", borderRadius: "10px" }}
                  >
                    <h4 className="">Active Plan Free</h4>
                    <p>
                      Your current plan is the Free Plan. Upgrade to a premium
                      plan for more features!
                    </p>
                    <Link
                      to={`/UpgradePlan/${corp_id}`}
                      className="btn btn text-white"
                      style={{ background: "#1C4481" }}
                    >
                      Upgrade Plan
                    </Link>
                  </div>

                  <div className="row">
                    {/* Card 1: Total Exam */}
                    <div className="col-md-4 mb-4 rounded-lg">
                      <span
                        href="#"
                        className="card text-center card-light-blue"
                        style={{ background: "#4775d1", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="../batch.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Exam
                            </h5>
                          </div>
                          <div className="card-data text-start">
                            <span className="fs-2 text-white">{data.exam}</span>
                          </div>
                        </div>
                        <div className="mb-4 my-2">
                          <button className="btn btn-light border-secondary">
                            View Details
                          </button>
                        </div>
                      </span>
                    </div>

                    {/* Card 2: Total Batch */}
                    <div className="col-md-4 mb-4">
                      <a
                        href="exams.html"
                        className="card text-center card-light-green text-decoration-none"
                        style={{ background: "#004d4d", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="../candidate.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Batch
                            </h5>
                          </div>
                          <div className="card-data text-start">
                            <span className="fs-2 text-white">{data.batch}</span>
                          </div>
                        </div>
                        <div className="mb-4 my-2">
                          <button className="btn btn-light border-secondary">
                            View Details
                          </button>
                        </div>
                      </a>
                    </div>

                    {/* Card 3: Total Student */}
                    <div className="col-md-4 mb-4">
                      <span
                        href="batches.html"
                        className="card text-center card-light-yellow"
                        style={{ background: "#d966ff", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="../exam.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Student
                            </h5>
                          </div>
                          <div className="card-data text-start">
                            <span className="fs-2 text-white">{data.student}</span>
                          </div>
                        </div>
                        <div className="mb-4 my-2">
                          <button className="btn btn-light border-secondary">
                            View Details
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>

                  {/* Assessment Console Card */}
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div
                        className="card text-center"
                        style={{ background: "#936963" }}
                      >
                        <div
                          className="text-white mt-4"
                          style={{ background: "#936963" }}
                        >
                          Assessment Console
                        </div>
                        <br />
                        <div
                          className="card-body"
                          style={{ background: "#936963" }}
                        >
                          <button
                            type="submit"
                            className="btn btn-danger border-secondary text-bold p-2"
                            style={{ marginTop: "-27px", background: "#1C4481" }}
                          >
                            Assess Assessment Console
                          </button>
                          <p className="card-text mb-5 text-white">
                            Manage users, exams, and settings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
