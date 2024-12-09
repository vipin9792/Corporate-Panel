import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TransactionPage = () => {
  const { corp_id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

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

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Company Name</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to={`/Dashboard/${corp_id}`}>Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/UpgradePlan/${corp_id}`}>Plan</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/TransectionPage/${corp_id}`}>Transactions</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="layout-menu menu-vertical bg-primary">
        <ul className="menu-inner py-1">
          <li className="menu-item">
            <Link to={`/Dashboard/${corp_id}`} className="menu-link text-decoration-none">
              <FontAwesomeIcon icon={faUserCircle} className="menu-icon" />
              Dashboard
            </Link>
          </li>
          <li className="menu-item">
            <Link to={`/ViewProfile/${corp_id}`} className="menu-link text-decoration-none">
              <FontAwesomeIcon icon={faUserEdit} className="menu-icon" />
              Profile
            </Link>
          </li>
          <li className="menu-item">
            <Link to={`/UpgradePlan/${corp_id}`} className="menu-link text-decoration-none">
              <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
              Plan
            </Link>
          </li>
          <li className="menu-item">
            <Link to={`/TransectionPage/${corp_id}`} className="menu-link text-decoration-none">
              <FontAwesomeIcon icon={faCalendarAlt} className="menu-icon" />
              Transactions
            </Link>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <div className="layout-page bg-white flex-grow-1" style={{ overflowY: "auto" }}>
        <div className="container">
          <h4 className="fw-bold text-primary mt-3">Transactions</h4>

          <div className="table-responsive mt-4">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plan Name</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading transactions...
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan="6" className="text-center text-danger">
                      {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && currentTransactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No transactions found.
                    </td>
                  </tr>
                )}
                {!loading && !error && currentTransactions.length > 0 && currentTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{indexOfFirstTransaction + index + 1}</td>
                    <td>{transaction.plan_name}</td>
                    <td>{transaction.order_id}</td>
                    <td>₹{transaction.amount}</td>
                    <td className={transaction.payment_status === -1 ? "text-warning" : "text-success"}>
                      {transaction.payment_status === -1 ? "Pending" : "Completed"}
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className="page-item" onClick={() => paginate(1)}>
                  <a className="page-link" href="#">First</a>
                </li>
                <li className="page-item" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  <a className="page-link" href="#">Previous</a>
                </li>
                {[...Array(totalPages).keys()].map((number) => (
                  <li key={number} className={`page-item ${currentPage === number + 1 ? "active" : ""}`}>
                    <a className="page-link" href="#" onClick={() => paginate(number + 1)}>
                      {number + 1}
                    </a>
                  </li>
                ))}
                <li className="page-item" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                  <a className="page-link" href="#">Next</a>
                </li>
                <li className="page-item" onClick={() => paginate(totalPages)}>
                  <a className="page-link" href="#">Last</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default TransactionPage;
