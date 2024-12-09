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

  const [data, setData] = useState({ exam: 0, batch: 0, student: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for corp_id:", corp_id);

        // Fetching the dashboard data
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

        console.log("Dashboard API Response Data:", response.data);
        if (response.data.code === 1000) {
          setData(response.data.detail);
        } else {
          setError("Unexpected response code: " + response.data.code);
        }

        // Fetching the transaction data for subscriptions
        const transactionResponse = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchTransactions",
          { corp_id: corp_id },
          {
            headers: {
              Authorization:
                "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        console.log("Transaction API Response Data:", transactionResponse.data);
        if (transactionResponse.data.code === 1000) {
          setTransactions(transactionResponse.data.transactions);

          // Logic to find the most recent active plan
          const activeTransaction = transactionResponse.data.transactions.find(
            (transaction) => transaction.payment_status === 1
          );
          if (activeTransaction) {
            setActivePlan(activeTransaction);
          } else {
            setActivePlan(null); // No active plan found
          }
        } else {
          setError("Unexpected response code: " + transactionResponse.data.code);
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
              {/* Sidebar and other menu items */}
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

              {/* Show Active Plan or Static Data */}
              {!loading && !error && (
                <div className="container mt-1">
                  {/* Active Plan Section */}
                  {activePlan ? (
                    <div className="alert alert-success text-center p-4 shadow-sm rounded">
                      <h4 className="text-uppercase mb-3 text-success">
                        Active Plan: <span className="fw-bold">{activePlan.plan_name}</span>
                      </h4>
                      <div className="d-flex justify-content-center mb-3">
                        <div className="mx-4">
                          <h6 className="text-muted">Amount</h6>
                          <p className="fs-4 text-primary">₹{activePlan.amount}</p>
                        </div>
                        <div className="mx-4">
                          <h6 className="text-muted">Payment Date</h6>
                          <p className="fs-4 text-primary">{new Date(activePlan.payment_date).toLocaleDateString()}</p>
                        </div>
                        <div className="mx-4">
                          <h6 className="text-muted">Status</h6>
                          <p className="fs-4 text-success">
                            {activePlan.payment_status === 1 ? "Success" : "Failed"}
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
                    // Static Data when no active plan
                    <div className="alert alert-warning text-center p-4 shadow-sm rounded">
                      <h4 className="text-uppercase mb-3">No Active Subscription Found</h4>
                      <p className="fs-5">Your current plan has expired or you haven't purchased any plan yet.</p>
                      <Link
                        to={`/UpgradePlan/${corp_id}`}
                        className="btn btn-primary w-100 mt-3"
                      >
                        Upgrade Plan
                      </Link>
                    </div>
                  )}

                  {/* Your other dashboard content goes here */}
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
