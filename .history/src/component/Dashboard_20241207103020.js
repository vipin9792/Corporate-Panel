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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [errorTransactions, setErrorTransactions] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log("Fetching data for corp_id:", corp_id);

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

    const fetchTransactionsData = async () => {
      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchTransactions",
          { corp_id: corp_id },
          {
            headers: {
              Authorization:
                "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );
        console.log("Transactions API Response Data:", response.data);

        if (response.data.code === 1000) {
          setTransactions(response.data.transactions);
        } else {
          setErrorTransactions("Unexpected response code: " + response.data.code);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setErrorTransactions("Error fetching transactions: " + err.message);
      } finally {
        setLoadingTransactions(false);
      }
    };

    fetchDashboardData();
    fetchTransactionsData();
  }, [corp_id]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            {/* Sidebar and Header */}
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
              {/* Menu Items */}
            </aside>

            {/* Content Area */}
            <div className="layout-page bg-white">
              <div className="container h-15vh">
                <div className="row mt-3 align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Dashboard</h4>
                  </div>
                </div>
              </div>

              {loading && <p>Loading dashboard data...</p>}
              {error && <p className="text-danger">{error}</p>}

              {/* Transaction Details */}
              {loadingTransactions ? (
                <p>Loading transactions...</p>
              ) : errorTransactions ? (
                <p className="text-danger">{errorTransactions}</p>
              ) : (
                <div className="container mt-1">
                  <h5 className="text-primary">Transaction Details</h5>
                  <div className="row">
                    {transactions.map((transaction) => (
                      <div className="col-md-4 mb-4" key={transaction.id}>
                        <div
                          className="card text-center"
                          style={{ background: "#f7f7f7", borderRadius: "15px" }}
                        >
                          <div className="card-body">
                            <h5 className="card-title">{transaction.plan_name}</h5>
                            <p className="card-text">
                              <strong>Amount:</strong> ₹{transaction.amount}
                            </p>
                            <p className="card-text">
                              <strong>Status:</strong>{" "}
                              {transaction.payment_status === 1
                                ? "Paid"
                                : "Pending"}
                            </p>
                            <p className="card-text">
                              <strong>Payment Mode:</strong> {transaction.payment_mode || "N/A"}
                            </p>
                            <p className="card-text">
                              <strong>Payment Date:</strong>{" "}
                              {transaction.payment_date
                                ? new Date(transaction.payment_date).toLocaleString()
                                : "Not available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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

export default Dashboard;
