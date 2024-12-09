import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const TransactionPage = () => {
  const { corp_id } = useParams(); 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions for corp_id:", corp_id);


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

        console.log("API Response Data:", response.data);

        if (response.data.code === 1000) {
          setTransactions(response.data.transactions); 
        } else {
          setError("Unexpected response code: " + response.data.code); 
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Error fetching transactions: " + err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTransactions();
  }, [corp_id]);

  const planImages = {
    Platinum: "/images/platinum.svg", 
    Gold: "/images/gold.svg", 
    Silver: "/images/silver.svg", 
    Bronze: "/images/bronze.svg", 
    Basic: "/images/basic.svg", 
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
                    to={`/Dashboard/${corp_id}`}
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
                  <Link
                    to={`/UpgradePlan/${corp_id}`}
                    className="menu-link text-decoration-none"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white"> Plan</span>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link
                    to={`/TransectionPage/${corp_id}`}
                    className="menu-link text-decoration-none"
                  >
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
                    <h4 className="fw-bold text-primary">Transections</h4>
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
              </div><br />




              <div class="container">
        <div class="row">
            <div class="col-12 transaction-card">
                <div class="card shadow-sm">
                    <div class="card-body">
                   
                        <h3 class="transaction-header text-center">Transaction Details   </h3>

                  
                        <div class="text-center">
                           
                        </div>
                        <h4 class="text-center transaction-status success">Transaction Successful <br /><span class="transaction-status success">
                                <i class="bi bi-check-circle" style={{fontSize:"50px"}}></i>
                            </span></h4>
                      
</div></div>
</div>
</div>
</div>












              {loading && <p>Loading transactions...</p>}
              {error && <p className="text-danger">{error}</p>}

            
              {!loading && !error && (
                <div className="container mt-3">
                  <div className="row">
                    
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <div className="col-md-4 mb-4" key={transaction.id}>
                          <div
                            className="card text-center"
                            style={{
                              borderRadius: "15px",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                              background: "#f8f9fa",
                            }}
                          >
                            <div className="card-body">
                              <h5
                                className="card-title"
                                style={{
                                  color: "#1C4481",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                }}
                              >
                                {transaction.plan_name} Plan
                              </h5>

                        
                              <img
                                src={
                                  planImages[transaction.plan_name] ||
                                  "/images/default.svg"
                                } 
                                alt={transaction.plan_name}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  margin: "10px 0",
                                }}
                              />

                              <p
                                className="card-text"
                                style={{
                                  marginTop: "10px",
                                  fontSize: "1rem",
                                  color: "#495057",
                                }}
                              >
                                Order ID: {transaction.order_id}
                              </p>
                              <p
                                className="card-text"
                                style={{
                                  fontSize: "1rem",
                                  fontWeight: "bold",
                                  color: "#007bff",
                                }}
                              >
                                Amount: ₹{transaction.amount}
                              </p>

                          
                              <p
                                className={`card-text ${
                                  transaction.payment_status === -1
                                    ? "text-warning"
                                    : "text-success"
                                }`}
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {transaction.payment_status === -1
                                  ? "Pending"
                                  : "Completed"}
                              </p>

                        
                              <button
                                className="btn btn-primary"
                                style={{
                                  marginTop: "15px",
                                  borderRadius: "10px",
                                }}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-md-12">
                        <p className="text-center">No transactions found.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default TransactionPage;
