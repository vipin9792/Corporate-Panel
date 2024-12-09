import React, { useEffect, useState } from "react";
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
import axios from "axios";

const Dashboard = () => {
  // Get corp_id from the URL parameters
  const { corp_id } = useParams();

  // State variables to store the data, loading state, and any errors
  const [data, setData] = useState({ exam: 0, batch: 0, student: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data on component mount or when corp_id changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for corp_id:", corp_id);

        // API request
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchDetail",
          { corp_id: corp_id },
          {
            headers: {
              Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"
            },
          }
        );

        console.log("Response Data:", response.data);

        // If the response code is 1000, store the data
        if (response.data.code === 1000) {
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
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              {/* Sidebar content */}
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

              {/* Display loading state */}
              {loading && <p>Loading data...</p>}

              {/* Display error message */}
              {error && <p className="text-danger">{error}</p>}

              {/* Display fetched data */}
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
                      to="/UpgradePlan"
                      className="btn btn text-white"
                      style={{ background: "#1C4481" }}
                    >
                      Upgrade Plan
                    </Link>
                  </div>

                  <div className="row">
                    {/* Card 1: Total Hackathon */}
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
                              Total Hackathon
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

                    {/* Card 2: Free Hackathon */}
                    <div className="col-md-4 mb-4">
                      <a
                        href="exams.html"
                        className="card text-center card-light-green text-decoration-none"
                        style={{ background: "#004d4d", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="c../andidate.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Free Hackathon
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

                    {/* Card 3: Paid Hackathon */}
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
                              Paid Hackathon
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
