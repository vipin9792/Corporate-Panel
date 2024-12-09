import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams();
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [razorpayOrderId, setRazorpayOrderId] = useState(null);

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Replace with your valid bearer token

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
    try {
      // Create Razorpay Order
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
        const { razorpay_payment_id, sdk_key, pay_detail } = response.data;
        setRazorpayOrderId(pay_detail.order_id);

        // Razorpay options for checkout
        const options = {
          key: sdk_key,
          amount: pay_detail.amount * 100, // Amount in paisa (Razorpay expects this in the smallest unit)
          currency: "INR",
          name: "Your Company Name",
          description: "Subscription Plan Payment",
          order_id: pay_detail.order_id,
          handler: async function (response) {
            const razorpayPaymentId = response.razorpay_payment_id;
            const razorpayOrderId = response.razorpay_order_id;
            await updatePaymentStatus(razorpayPaymentId, razorpayOrderId);
          },
          prefill: {
            name: "User TP",
            email: "user@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#528FF0",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open(); // Open Razorpay checkout
      } else {
        setError("Failed to create Razorpay order.");
      }
    } catch (err) {
      console.error("Error during Razorpay order creation:", err);
      setError("An error occurred while creating the payment.");
    }
  };

  // Update payment status after successful payment
  const updatePaymentStatus = async (razorpay_payment_id, razorpay_order_id) => {
    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/updatePayment",
        {
          corp_id,
          id_plan,
          id_payment: razorpay_order_id,
          razorpay_payment_id,
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        console.log("Payment updated successfully:", response.data);
      } else {
        console.error("Failed to update payment:", response.data);
      }
    } catch (err) {
      console.error("Error during payment update:", err);
      setError("An error occurred while updating the payment status.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Container>
        <Row>
          <Col md={8}>
            <Card className="shadow-sm mb-4 rounded-3">
              <Card.Body className="text-center">
                <Card.Title className="fs-1">
                  <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {planData ? planData.plan_name : "Plan Name"}
                  </p>
                </Card.Title>

                <p className="plan-price fs-2 fw-bold text-success">
                  ${planData ? planData.total_cost : "39.99"} / Month
                </p>
                <p>
                  <strong>Discount:</strong> {planData ? planData.discount : "0"}%
                </p>
                <p>
                  <strong>Storage:</strong> {planData ? planData.total_storage : "20"} GB
                </p>
                <p>
                  <strong>Number of Exams:</strong> {planData ? planData.no_of_exam : "10"}
                </p>

                <Button variant="success" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Displaying Features */}
        {planData && planData.features && (
          <section className="bg-light">
            <Container>
              <span
                className="fw-b text-success"
                style={{ fontSize: "26px", marginLeft: "182px", marginTop: "92px" }}
              >
                Features:
              </span>
              {planData.features.map((feature) => (
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
              ))}
            </Container>
          </section>
        )}
      </Container>
    </div>
  );
};

export default PlanDetails;
