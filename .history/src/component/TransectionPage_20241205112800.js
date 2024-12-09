import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const TransactionPage = () => {
    const { corp_id } = useParams();
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(""); // success, pending, failed

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Your Bearer Token here

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // API call to fetch transaction details
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/transaction/fetchDetails",
          { transaction_id },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        // Show the API response in an alert
        alert(`API Response: ${JSON.stringify(response.data)}`); // Show the API response in alert

        // Log the response for debugging purposes
        console.log("API Response:", response.data); 

        if (response.data.code === 1000) {
          setTransactionDetails(response.data.transaction);
          setStatus(response.data.transaction.status); // Assuming response contains status
        } else {
          setError(response.data.status || "Unknown error");
          alert(`Error: ${response.data.status || "Unknown error"}`); // Show error message in alert
        }
      } catch (err) {
        console.error("Error fetching transaction details:", err);
        setError("An error occurred while fetching the transaction details.");
        alert("Error: An error occurred while fetching the transaction details."); // Show error in alert
      } finally {
        setLoading(false);
      }
    };

    if (transaction_id) {
      fetchTransactionDetails();
    }
  }, [transaction_id]);

  // Check if the API response was received
  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />;
      case "failed":
        return <FontAwesomeIcon icon={faTimesCircle} size="3x" color="red" />;
      case "pending":
        return <FontAwesomeIcon icon={faCreditCard} size="3x" color="orange" />;
      default:
        return <FontAwesomeIcon icon={faCreditCard} size="3x" color="gray" />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        <div className="layout-container">
          <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: "100vh", zIndex: 1 }}>
            <div className="app-brand demo" style={{ background: "#1C4481" }}>
              <a href="index.html" className="app-brand-link">
                <img src="/logo1.png" alt="dashboard-active" className="img-fluid" />
              </a>
            </div>
            <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
              {/* Your sidebar menu */}
            </ul>
          </aside>

          {/* Transaction Details */}
          <div className="layout-page bg-white">
            <Container>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <h3 className="text-center">Transaction Details</h3>
                      {getStatusIcon()}
                      <h4 className="mt-3 text-center">
                        Transaction {status === "success" ? "Successful" : status === "failed" ? "Failed" : "Pending"}
                      </h4>
                      <hr />
                      {transactionDetails && (
                        <div>
                          <p><strong>Transaction ID:</strong> {transactionDetails.transaction_id}</p>
                          <p><strong>Amount:</strong> {transactionDetails.amount} {transactionDetails.currency}</p>
                          <p><strong>Payment Mode:</strong> {transactionDetails.payment_mode}</p>
                          <p><strong>Date:</strong> {new Date(transactionDetails.date).toLocaleString()}</p>
                          <p><strong>Status:</strong> {status}</p>
                        </div>
                      )}
                      {status === "failed" && (
                        <Alert variant="danger">Your payment was not successful. Please try again.</Alert>
                      )}
                      {status === "pending" && (
                        <Alert variant="warning">Your payment is pending. Please wait.</Alert>
                      )}
                      {status === "success" && (
                        <Alert variant="success">Your payment was successful! Thank you for your purchase.</Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
