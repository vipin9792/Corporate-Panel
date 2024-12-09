// PlanDetails.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { fetchPlanDetails, buyPlan, updatePayment } from "../Api Folder/PlanDetailsAllApi";  // Import the API functions

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const getPlanDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPlanDetails(corp_id, id_plan); // Fetch plan details using the API
        if (data.code === 1000) {
          setPlanData(data.plan); // Set plan data if the response is successful
        } else {
          setError(data.status || "Unknown error");
        }
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (corp_id && id_plan) {
      getPlanDetails(); // Fetch the plan details when the component mounts
    }
  }, [corp_id, id_plan]);

  const handleBuyNow = async () => {
    setIsProcessingPayment(true);
    setError(null);

    try {
      const data = await buyPlan(corp_id, id_plan); // Buy the plan using the API
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
              const updateData = await updatePayment(corp_id, id_plan, {
                id_payment: paymentDetails.id_payment,
                razorpay_payment_id: razorpayPaymentId,
              });
              if (updateData.code === 1000) {
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
      setError(err.message || "An error occurred.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const actualPrice = planData ? planData.total_cost : 39.99;
  const discount = planData ? planData.discount : 0;
  const discountedPrice = actualPrice - (actualPrice * discount) / 100;

  return (
    <>
      {/* Your existing JSX remains the same */}
      {/* ... */}
    </>
  );
};

export default PlanDetails;
