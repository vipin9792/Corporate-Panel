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
          { corp_id },
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
        console.error("Error fetching data:", err);
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [corp_id]);

  // Plan images
  const planImages = {
    Platinum: "/images/platinum.svg",
    Gold: "/images/gold.svg",
    Silver: "/images/silver.svg",
    Bronze: "/images/bronze.svg",
    Basic: "/images/basic.svg",
  };

  return (
    <div className="container mt-5">
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && transactions.length > 0 && (
        <div className="row">
          {transactions.map((transaction) => (
            <div className="col-md-4 mb-4" key={transaction.id}>
              <div
                className="card text-center"
                style={{
                  background: "#4775d1",
                  borderRadius: "22px",
                }}
              >
                <img
                  src={planImages[transaction.plan_name] || "/images/default.svg"}
                  alt={transaction.plan_name}
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "10px 0",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title text-white fs-5">
                    {transaction.plan_name} Plan
                  </h5>
                  <p className="text-white">
                    <strong>Amount:</strong> {transaction.amount} INR
                  </p>
                  <p className="text-white">
                    <strong>Order ID:</strong> {transaction.order_id}
                  </p>
                  <p className="text-white">
                    <strong>Reference ID:</strong> {transaction.reference_id}
                  </p>
                  <button className="btn btn-light border-secondary">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {transactions.length === 0 && !loading && !error && (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TransactionPage;
