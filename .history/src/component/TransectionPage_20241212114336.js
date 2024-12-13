import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTransactions } from "../Api Folder/TransectionApi";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  faUserCircle,
  faCaretDown,
  faKey,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching transactions for corp_id:", corp_id);
        const responseData = await fetchTransactions(corp_id);

        console.log("API Response Data:", responseData);

        if (responseData.code === 1000) {
          setTransactions(responseData.transactions);
        } else {
          setError("Unexpected response code: " + responseData.code);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Error fetching transactions: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [corp_id]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
           <Navbar/>

            <div className="layout-page bg-white">
            <div className="container h-15vh">
  <div className="row mt-3 align-items-center">
    <div className="col-lg-8">
      <h4 className="fw-bold text-primary">Dashboard</h4>
    </div>
    <div className="col-lg-4" >
      <div className="row justify-content-end">
        <div className="col-lg-6" style={{width:"250px"}}>
          <div className="border rounded-pill  d-flex align-items-center upDashboard">
            <img
              src="../d-user.svg"
              alt="d-user"
              className="img-fluid"
              width="50px"
            />
            <h6 className="ms-2 mb-0">
              <span className="text-primary lh-1">Welcome
              <br /> User TP </span>
              {/* Dropdown for options */}
              <div className="dropdown d-inline">
                <button
                  className="btn btn-link  "
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
             <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                      color: "grey",
                      width: "20px",
                      height: "20px",
                    }}
                  />  
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {/* View Profile */}
                  <li>
                    <Link className="dropdown-item"  to={`/ViewProfile/${corp_id}`}>
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      View Profile
                    </Link>
                  </li>
                  {/* Change Password */}
                  <li>
                    <Link className="dropdown-item" to={`/ChangePassword/${corp_id}`}>
                      <FontAwesomeIcon
                        icon={faKey}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      Change Password
                    </Link>
                  </li>
                  {/* Logout */}
                  <li>
                    <a className="dropdown-item" href="#">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      Logout
                    </a>
                  </li>

                  
                </ul>
                <Link to="">
                              <FontAwesomeIcon icon={faSignOutAlt} style={{color: "grey", width: "25px", height: "15px",}}/>
                            </Link>
              </div> 
            </h6>


            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


              <div className="container mt-3">
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
                      {loading && (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      )}
                      {!loading && transactions.length > 0 ? (
                        currentTransactions.map((transaction, index) => (
                          <tr key={transaction.order_id}>
                            <td>
                              {index +
                                1 +
                                (currentPage - 1) * transactionsPerPage}
                            </td>
                            <td>{transaction.plan_name}</td>
                            <td>₹{transaction.amount}</td>
                            <td
                              className={
                                transaction.payment_status === -1
                                  ? "text-warning"
                                  : "text-success"
                              }
                            >
                              {transaction.payment_status === -1
                                ? "Pending"
                                : "Completed"}
                            </td>
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

                <div className="d-flex justify-content-center mt-3">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link "
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Pre
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map((num) => (
                        <li
                          key={num}
                          className={`page-item ${
                            currentPage === num + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(num + 1)}
                          >
                            {num + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />

        <Footer />
      </div>
    </>
  );
};

export default TransactionPage;
