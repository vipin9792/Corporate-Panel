import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransactionPage = () => {
  const { corp_id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
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

        if (response.data.code === 1000) {
          setTransactions(response.data.transactions); 
        } else {
          setError("Unexpected response code: " + response.data.code);
        }
      } catch (err) {
        setError("Error fetching transactions: " + err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTransactions();
  }, [corp_id]);

  return (
    <>
      <div className="container mt-3">
        <h4 className="fw-bold text-primary">Transactions</h4>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={transaction.order_id}>
                      <td>{index + 1}</td>
                      <td>{transaction.plan_name || "N/A"}</td>
                      <td>{transaction.amount ? `₹${transaction.amount}` : "N/A"}</td>
                      <td>{transaction.payment_status === -1 ? "Pending" : "Completed"}</td>
                      <td>
                        <button className="btn btn-primary">
                          View Details
                        </button>
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
        )}
      </div>
    </>
  );
};

export default TransactionPage;
