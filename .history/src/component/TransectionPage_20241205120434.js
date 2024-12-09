import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const TransectionPage = () => {
  const { corp_id } = useParams(); // Get the corp_id from the URL params
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
              {/* ... your sidebar code ... */}
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
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Transaction History</h5>
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Plan Name</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Payment Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                  <tr key={transaction.id}>
                                    <td>{transaction.order_id}</td>
                                    <td>{transaction.plan_name}</td>
                                    <td>{transaction.amount}</td>
                                    <td>
                                      {transaction.payment_status === -1
                                        ? "Pending"
                                        : "Completed"}
                                    </td>
                                    <td>
                                      {transaction.payment_date
                                        ? transaction.payment_date
                                        : "Not Available"}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No transactions found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
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

export default TransectionPage;
