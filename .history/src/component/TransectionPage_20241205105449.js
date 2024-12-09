import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from './Footer';
import Navbar from './Navbar';

const TransectionPage = () => {
  const { corp_id } = useParams();  // Retrieve corp_id from the URL parameters
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions based on corp_id
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchTransactions",
          { corp_id },
          {
            headers: {
              Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        if (response.data.code === 1000) {
          setTransactions(response.data.transactions);  // Update state with the transactions data
        } else {
          setError(response.data.status || "Failed to fetch transactions");
        }
      } catch (err) {
        setError("An error occurred while fetching transactions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [corp_id]);  // Re-run the effect when corp_id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <Navbar />
      <section>
        <h1>Transaction List for Corp ID: {corp_id}</h1>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Plan Name</th>
              <th>Amount</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.order_id}</td>
                <td>{transaction.plan_name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.payment_status === -1 ? "Pending" : "Completed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </div>
  );
};

export default TransectionPage;
