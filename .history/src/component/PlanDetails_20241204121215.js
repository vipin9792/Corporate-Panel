import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Use the Bearer Token here

  useEffect(() => {
    const fetchPlanDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchPlanDetails",
          { corp_id, id_plan },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.code === 1000) {
          setPlanData(response.data.plan);
        } else {
          setError(response.data.status || "Unknown error");
        }
      } catch (err) {
        setError("An error occurred while fetching the plan details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (corp_id && id_plan) {
      fetchPlanDetails();
    }
  }, [corp_id, id_plan]);






  const handleBuyNow = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/buyPlan",
        { corp_id, id_plan },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
  
      console.log("Purchase API Response:", response.data);
  
      if (response.data.code === 1000) {
        const paymentDetails = response.data.payment_detail;
        const sdkKey = response.data.sdk_key; // Razorpay SDK key from API response
  
        // Check if Razorpay is available
        if (typeof window.Razorpay === "undefined") {
          setError("Razorpay SDK is not loaded correctly.");
          return;
        }
  
        // Razorpay Payment Options
        var options = {
          key: sdkKey, // Razorpay SDK key
          amount: paymentDetails.amount * 100, // Amount in the smallest currency unit (INR, paisa)
          currency: "INR",
          name: "Your Company Name",
          description: "Subscription Plan Payment",
          order_id: paymentDetails.order_id, // Order ID from API response
          receipt: paymentDetails.reference_id, // Use the reference_id from the API response
          prefill: {
            name: "User TP",
            email: "user@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#528FF0", // Theme color
          },
          handler: async function (response) {
            // Handle successful payment here
            const paymentId = response.razorpay_payment_id; // Extract the Razorpay Payment ID
            const orderId = response.razorpay_order_id; // Extract the Razorpay Order ID
  
            console.log("Payment Successful!");
            console.log("Razorpay Payment ID:", paymentId);
            console.log("Razorpay Order ID:", orderId);
  
            // Prepare the payload for updating the payment status
            const updatePaymentData = {
              corp_id: 1, // Use the correct corp_id
              id_plan: 6, // Use the correct id_plan
              id_payment: paymentDetails.id, // Payment ID from API response
              razorpay_payment_id: paymentId, // Razorpay Payment ID from the handler
              order_id: orderId, // Razorpay Order ID from the handler
              reference_id: paymentDetails.reference_id, // Reference ID from the API response
              payment_status: 1, // Assuming payment is successful, set status to 1
              amount: paymentDetails.amount, // Amount from the payment details
            };
  
            // Make an API call to update the payment status
            try {
              const updateResponse = await axios.post(
                "http://103.35.121.219:4000/corp/subscription/updatePayment",
                updatePaymentData,
                {
                  headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                  },
                }
              );
  
              console.log("Update API Response:", updateResponse.data);
  
              if (updateResponse.data.code === 1000) {
                // Payment update was successful
                console.log("Payment status updated successfully!");
                navigate(`/payment-success/${orderId}`);
              } else {
                setError(updateResponse.data.status || "Failed to update payment status.");
              }
            } catch (updateErr) {
              console.error("Error updating payment status:", updateErr);
              setError("An error occurred while updating the payment status.");
            }
          },
          modal: {
            ondismiss: function () {
              alert("Payment attempt cancelled.");
            },
          },
        };
  
        // Initialize Razorpay with the options and open the payment modal
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError(response.data.status || "Unknown error");
      }
    } catch (err) {
      setError("An error occurred while initiating the purchase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  



  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            {/* Sidebar */}
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              <div className="app-brand demo" style={{ background: "#1C4481" }}>
                <a href="index.html" className="app-brand-link">
                  <img
                    src="logo1.png"
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
                  <Link to="/" className="menu-link text-decoration-none">
                    <img
                      src="dashboard-active.svg"
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
                  <Link to={`/UpgradePlan/${corp_id}`} className="menu-link text-decoration-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                      className="me-2"
                    />
                    Upgrade Plan
                  </Link>
                </li>
                <li className="menu-item mt-4">
                  <a href="#signout" className="menu-link text-decoration-none">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="1x"
                      style={{ color: "white" }}
                      className="me-2"
                    />
                    Sign Out
                  </a>
                </li>
              </ul>
            </aside>

            {/* Plan Details */}
            <Container className="pt-3">
              <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                  {planData && (
                    <Card>
                      <Card.Body>
                        <Card.Title>{planData.name}</Card.Title>
                        <Card.Text>{planData.description}</Card.Text>
                        <Card.Text>Price: ₹{planData.amount}</Card.Text>
                        <Button
                          variant="primary"
                          onClick={handleBuyNow}
                          disabled={loading}
                        >
                          Buy Now
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlanDetails;
