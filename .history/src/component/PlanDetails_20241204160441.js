import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  const [paymentResponse, setPaymentResponse] = useState(null); // For storing payment response
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz
"; // Make sure the token is valid

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

      if (response.data.code === 1000) {
        const paymentDetails = response.data.payment_detail;
        const sdkKey = response.data.sdk_key;

        var options = {
          key: sdkKey, // Razorpay SDK key
          amount: paymentDetails.amount, // Amount in the smallest currency unit (INR, paisa)
          currency: paymentDetails.currency,
          name: "Your Company Name",
          description: "Subscription Plan Payment",
          order_id: paymentDetails.id, // Order ID
          receipt: paymentDetails.receipt,
          theme: {
            color: "#528FF0", // Theme color
          },
          handler: async function (response) {
            alert("Payment Successful!");
            const razorpayPaymentId = response.razorpay_payment_id;

            // After payment, call updatePayment API
            try {
              const updatePaymentResponse = await axios.post(
                "http://103.35.121.219:4000/corp/subscription/updatePayment",
                {
                  corp_id: 1,
                  id_plan: 6,
                  id_payment: paymentDetails.id,
                  razorpay_payment_id: razorpayPaymentId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                  },
                }
              );

              if (updatePaymentResponse.data.code === 1000) {
                setPaymentResponse(updatePaymentResponse.data.pay_detail);
                setShowPopup(true); // Show the popup with payment details
              } else {
                setError("Payment update failed!");
              }
            } catch (err) {
              setError("An error occurred while updating the payment.");
              console.error("Error while updating payment:", err);
            }
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

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
    navigate(`/Dashboard/${corp_id}`); // Navigate to the dashboard
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
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

      {/* Payment Response Popup */}
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentResponse ? (
            <div>
              <p><strong>Payment ID:</strong> {paymentResponse.razorpay_payment_id}</p>
              <p><strong>Amount Paid:</strong> {paymentResponse.amount}</p>
              <p><strong>Status:</strong> {paymentResponse.payment_status === 1 ? "Success" : "Failed"}</p>
              <p><strong>Order ID:</strong> {paymentResponse.order_id}</p>
              <p><strong>Expiry Date:</strong> {paymentResponse.expired_date}</p>
            </div>
          ) : (
            <p>Loading payment details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default PlanDetails;
