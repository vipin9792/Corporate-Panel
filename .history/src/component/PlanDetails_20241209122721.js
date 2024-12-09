import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
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

// Import the API functions
import { fetchPlanDetails, buyPlan, updatePaymentStatus } from '../Api Folder/PlanDetailsAllApi';

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const loadPlanDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPlanDetails(corp_id, id_plan);
        if (data.code === 1000) {
          setPlanData(data.plan);
        } else {
          setError(data.status || "Unknown error");
        }
      } catch (err) {
        setError("An error occurred while fetching the plan details.");
      } finally {
        setLoading(false);
      }
    };

    if (corp_id && id_plan) {
      loadPlanDetails();
    }
  }, [corp_id, id_plan]);

  const handleBuyNow = async () => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      const data = await buyPlan(corp_id, id_plan);
      if (data.code === 1000) {
        const paymentDetails = data.payment_detail;
        const sdkKey = data.sdk_key;

        var options = {
          key: sdkKey,
          amount: paymentDetails.amount * 100,
          currency: paymentDetails.currency,
          name: "Your Company Name",
          description: "Subscription Plan Payment",
          order_id: paymentDetails.id,
          receipt: paymentDetails.receipt,
          theme: { color: "#528FF0" },
          handler: async function (response) {
            alert("Payment Successful!");
            const razorpayPaymentId = response.razorpay_payment_id;
            const razorpayOrderId = response.razorpay_order_id;

            try {
              const updateResponse = await updatePaymentStatus(
                corp_id,
                id_plan,
                paymentDetails.id_payment,
                razorpayPaymentId
              );

              if (updateResponse.data.code === 1000) {
                navigate(`/Dashboard/${corp_id}`);
              } else {
                setError("Failed to update payment status.");
              }
            } catch (err) {
              setError("Error updating payment status.");
            }
          },
          modal: { ondismiss: function () { alert("Payment attempt cancelled."); } },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError(data.status || "Unknown error");
      }
    } catch (err) {
      setError("An error occurred while initiating the purchase.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Calculate the discounted price
  const actualPrice = planData ? planData.total_cost : 39.99;
  const discount = planData ? planData.discount : 0;
  const discountedPrice = actualPrice - (actualPrice * discount) / 100;

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        <div className="layout-container" style={{ position: "relative" }}>
          {/* Sidebar and Content Layout */}
          <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary">
            {/* Sidebar content here */}
          </aside>

          <div className="layout-page bg-white">
            <div className="container h-15vh">
              {/* Other content sections */}
              <section id="plans">
                <Container>
                  <Row className="justify-content-center">
                    <Col md={8}>
                      <Card className="shadow-sm mb-4 rounded-3">
                        <Card.Body className="text-center">
                          <Card.Title>
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                              {planData ? planData.plan_name : "Loading..."}
                            </p>
                            <hr style={{ color: "grey" }} />
                          </Card.Title>

                          <p className="plan-price fs-5 fw-bold text-success">
                            <span style={{ textDecoration: "line-through", color: "red" }}>
                              ${actualPrice.toFixed(2)}{" "}
                            </span>&nbsp;
                            ${discountedPrice.toFixed(2)} / Month
                          </p>
                          <p><strong>Discount:</strong> {planData ? planData.discount : "0"}%</p>
                          <p><strong>Time Limit:</strong> {planData ? planData.time_limt : "0"}</p>
                          <p><strong>Storage:</strong> {planData ? planData.total_storage : "20"} GB</p>
                          <p><strong>Number of Exams:</strong> {planData ? planData.no_of_exam : "10"}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </section>

              <div className="mt-4">
                <button
                  onClick={handleBuyNow}
                  className="btn btn-success btn-lg btn-md ms-2"
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? "Processing..." : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlanDetails;