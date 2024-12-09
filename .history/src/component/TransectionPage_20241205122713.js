import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const TransactionPage = () => {
  const { corp_id } = useParams(); // Get the corp_id from URL params
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Fetching transactions for corp_id:", corp_id);

        // Make the API call to fetch transactions
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
          setTransactions(response.data.transactions); // Set the transaction data
        } else {
          setError("Unexpected response code: " + response.data.code); // Handle unexpected response code
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Error fetching transactions: " + err.message); // Handle error in API call
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or error occurred
      }
    };

    fetchTransactions();
  }, [corp_id]);

  // Mapping plan names to image sources
  const planImages = {
    Platinum: "/images/platinum.svg",  // Path to Platinum image
    Gold: "/images/gold.svg",          // Path to Gold image
    Silver: "/images/silver.svg",      // Path to Silver image
    Bronze: "/images/bronze.svg",      // Path to Bronze image
    Basic: "/images/basic.svg",        // Path to Basic image
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            {/* Sidebar or layout menu (this could be reused from your existing layout) */}
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              {/* Sidebar content */}
            </aside>

            {/* Content Area */}
            <div className="layout-page bg-white">
              <div className="container h-15vh">
                <div className="row mt-3 align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Transaction Page</h4>
                  </div>
                </div>
              </div>

              {loading && <p>Loading transactions...</p>}
              {error && <p className="text-danger">{error}</p>}

              {/* Display Transaction Data */}
              {!loading && !error && (
                <div className="container mt-3">
                  <div className="row">
                    {/* Display each plan in a card layout */}
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
                              
                              {/* Dynamic Image Based on Plan Name */}
                              <img
                                src={planImages[transaction.plan_name] || "/images/default.svg"} // Default image if no plan matches
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

                              {/* Payment Status */}
                              <p
                                className={`card-text ${transaction.payment_status === -1 ? "text-warning" : "text-success"}`}
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {transaction.payment_status === -1
                                  ? "Pending"
                                  : "Completed"}
                              </p>

                              {/* View Details Button */}
                              <button
                                className="btn btn-primary"
                                style={{ marginTop: "15px", borderRadius: "10px" }}
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
        <Footer />
      </div>
    </>
  );
};

export default TransactionPage;
