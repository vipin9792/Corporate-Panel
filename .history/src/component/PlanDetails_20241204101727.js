import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

  // Handle Buy Now Button Click
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
        const sdkKey = response.data.sdk_key;

        // Redirect to Razorpay payment gateway using the SDK key and payment details
        var options = {
          key: sdkKey, // The Razorpay SDK key
          amount: paymentDetails.amount, // Amount to be paid
          currency: paymentDetails.currency, // Currency (INR in this case)
          name: "Your Company Name", // Your company name
          description: "Subscription Plan Payment", // Description of the payment
          order_id: paymentDetails.id, // Order ID from the response
          receipt: paymentDetails.receipt, // Receipt ID
          prefill: {
            name: "User TP", // User name
            email: "user@example.com", // User email
            contact: "1234567890", // User contact number
          },
          theme: {
            color: "#528FF0", // Theme color
          },
          handler: function (response) {
            // Handle successful payment here
            alert("Payment Successful!");
            // Optionally, you can redirect or update the UI after payment
            navigate(`/payment-success/${paymentDetails.id}`);
          },
          modal: {
            ondismiss: function () {
              alert("Payment attempt cancelled.");
            },
          },
        };

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
            {/* Sidebar content here... */}
            <div className="layout-page bg-white">
              {/* Header and other sections */}
              <section id="plans" style={{ width: "700px", marginLeft: "132px" }}>
                <br />
                <br />
                <br />
                <Container>
                  <Row className="justify-content-center">
                    <Col md={8}>
                      <Card className="shadow-sm mb-4 rounded-3">
                        <Card.Body className="text-center">
                          <Card.Title className="fs-1">
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                              {planData ? planData.plan_name : "0"}
                            </p>
                          </Card.Title>

                          <p className="plan-price fs-2 fw-bold text-success">
                            ${planData ? planData.total_cost : "39.99"} / Month
                          </p>
                          <p>
                            <strong>Discount:</strong>{" "}
                            {planData ? planData.discount : "0"}%
                          </p>
                          <p>
                            <strong>Storage:</strong>{" "}
                            {planData ? planData.total_storage : "20"} GB
                          </p>
                          <p>
                            <strong>Number of Exams:</strong>{" "}
                            {planData ? planData.no_of_exam : "10"}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </section>
              <br />

              <div
                className="mt-4"
                style={{ position: "absolute", left: "60%", top: "38%" }}
              >
                <button
                  className="btn btn-success btn-md ms-2"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>

              {/* Description and Features Section */}
              <section className="bg-light">
                <Container>
                  <div className="list-unstyled">
                    <span
                      className="fw-b text-success"
                      style={{
                        fontSize: "26px",
                        marginLeft: "182px",
                        marginTop: "92px",
                      }}
                    >
                      Features:
                    </span>
                    {planData && planData.features ? (
                      planData.features.map((feature) => (
                        <p
                          key={feature.id_subscription}
                          style={{
                            fontSize: "16px",
                            marginLeft: "192px",
                            marginTop: "12px",
                          }}
                        >
                          {feature.subscription_display_name}
                        </p>
                      ))
                    ) : (
                      <li>No features available.</li>
                    )}
                  </div>
                </Container>
                <br />
                <br />
                <br />
                <br />
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PlanDetails;
