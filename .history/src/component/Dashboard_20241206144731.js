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

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [corp_id]);

  // Fetch Transaction Data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transaction data for corp_id:", corp_id);

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

        console.log("Transaction API Response:", response.data);

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

    fetchTransactions();
  }, [corp_id]);

  const renderPlanDetails = () => {
    const activeTransaction = transactions.find(
      (transaction) => transaction.payment_status === 1
    );

    if (activeTransaction) {
      return (
        <div className="alert" role="alert" style={{ background: "#EDF2FF", borderRadius: "10px" }}>
          <h4 className="">Active Plan: {activeTransaction.plan_name}</h4>
          <p>
            Your current plan is {activeTransaction.plan_name}. Payment made on{" "}
            {new Date(activeTransaction.payment_date).toLocaleDateString()}.
          </p>
          <Link
            to={`/UpgradePlan/${corp_id}`}
            className="btn btn text-white"
            style={{ background: "#1C4481" }}
          >
            Upgrade Plan
          </Link>
        </div>
      );
    } else {
      return (
        <div className="alert" role="alert" style={{ background: "#EDF2FF", borderRadius: "10px" }}>
          <h4 className="">No Active Plan</h4>
          <p>No active plan found. Please purchase a plan to access more features.</p>
          <Link
            to={`/UpgradePlan/${corp_id}`}
            className="btn btn text-white"
            style={{ background: "#1C4481" }}
          >
            Purchase Plan
          </Link>
        </div>
      );
    }
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
              {/* Menu Code (same as before) */}
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

              {loading && <p>Loading data...</p>}
              {error && <p className="text-danger">{error}</p>}
              {loadingTransactions && <p>Loading transaction data...</p>}
              {errorTransactions && <p className="text-danger">{errorTransactions}</p>}

              {!loading && !error && (
                <div className="container mt-1">
                  {renderPlanDetails()}

                  {/* Additional content can be added here */}
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
  