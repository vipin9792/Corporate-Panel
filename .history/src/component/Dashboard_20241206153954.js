import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { corp_id } = useParams();

  const [data, setData] = useState({ exam: 0, batch: 0, student: 0 });
  const [plan, setPlan] = useState(null); // State to hold the most recent plan data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard and transaction data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for corp_id:", corp_id);

        // Fetch dashboard data
        const dashboardResponse = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchDetail",
          { corp_id },
          {
            headers: {
              Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );
        if (dashboardResponse.data.code === 1000) {
          setData(dashboardResponse.data.detail);
        } else {
          setError("Unexpected response code: " + dashboardResponse.data.code);
        }

        // Fetch transaction data (plan purchase details)
        const transactionResponse = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchTransactions",
          { corp_id },
          {
            headers: {
              Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        // Filter successful transactions
        const successfulTransactions = transactionResponse.data.transactions.filter(
          (transaction) => transaction.payment_status === 1
        );

        if (successfulTransactions.length > 0) {
          // Sort the successful transactions by payment date to get the latest
          const latestTransaction = successfulTransactions.sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))[0];
          setPlan(latestTransaction); // Set the latest successful plan
        } else {
          setError("No successful transactions found");
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
                  <Link to="" className="menu-link text-decoration-none">
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
                        <Link to="" className="text-white text-decoration-none">
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
                  <Link to="" className="menu-link text-decoration-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white"> Plan</span>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link className="menu-link text-decoration-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white"> Transection</span>
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

              {loading && <p>Loading data...</p>}
              {error && <p className="text-danger">{error}</p>}

              {!loading && !error && (
                <div className="container mt-1">
                  {plan ? (
                    <div
                      className="card shadow-sm rounded"
                      style={{ background: "#F8F9FA", padding: "20px" }}
                    >
                      <h4 className="card-title text-center text-success mb-3">
                        Active Plan: <span className="fw-bold">{plan.plan_name}</span>
                      </h4>
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <h6 className="text-muted">Amount</h6>
                          <p className="fs-4 text-primary">₹{plan.amount}</p>
                        </div>
                        <div>
                          <h6 className="text-muted">Payment Date</h6>
                          <p className="fs-4 text-primary">{new Date(plan.payment_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <h6 className="text-muted">Status</h6>
                          <p className="fs-4 text-success">
                            {plan.payment_status === 1 ? "Success" : "Failed"}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/UpgradePlan/${corp_id}`}
                        className="btn btn-primary w-100 mt-3"
                      >
                        Upgrade Plan
                      </Link>
                    </div>
                  ) : (
                    <div className="alert alert-warning text-center p-4 shadow-sm rounded">
                      <h4 className="text-uppercase mb-3">No Active Subscription Found</h4>
                      <p className="fs-5">Your current plan has expired, please upgrade.</p>
                      <Link to={`/UpgradePlan/${corp_id}`} className="btn btn-info">Upgrade Now</Link>
                    </div>
                  )}
                </div>
              )}






























            </div>
         
          </div>
      
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
