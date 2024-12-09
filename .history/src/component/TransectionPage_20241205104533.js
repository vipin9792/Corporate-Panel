import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from './Footer'
import Navbar from './Navbar'

const TransectionPage = () => {
    const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API using axios when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get("http://103.35.121.219:4000/corp/subscription/fetchTransactions", {
          headers: {
            Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"
          }
        });
        if (response.data.code === 1000) {
          setTransactions(response.data.transactions);  // Update state with the transactions data
        } else {
          throw new Error('Failed to fetch transactions');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

    fetchTransactions();
  }, []);  // Empty dependency array means this runs once when the component mounts

  // JSX for loading, error, and success states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
        <Navbar/> 
        <section style={{position:"absolute",top:"12%",left:"20%"}}>
       
        <div>
      <h1>Transaction List</h1>
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
              <td>
                {transaction.payment_status === -1 ? "Pending" : "Completed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            </section>
           
       
      <Footer/>
    </div>
  )
}

export default TransectionPage
