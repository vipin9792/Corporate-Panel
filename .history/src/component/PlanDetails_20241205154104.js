import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

        if (response.data.code === 1000) {
          console.log("API Response (fetchPlanDetails):", response.data.status); // Success message
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
    setIsProcessingPayment(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/subscription/buyPlan",
        { corp_id, id_plan },
        {
          headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
        }
      );

      if (response.data.code === 1000) {
        console.log("API Response (buyPlan):", response.data.status); // Success message
        const paymentDetails = response.data.payment_detail;
        const sdkKey = response.data.sdk_key;

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
              const updateResponse = await axios.post(
                "http://103.35.121.219:4000/corp/subscription/updatePayment",
                {
                  corp_id: corp_id,
                  id_plan: id_plan,
                  id_payment: paymentDetails.id_payment,
                  razorpay_payment_id: razorpayPaymentId,
                },
                { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
              );

              if (updateResponse.data.code === 1000) {
                console.log("API Response (updatePayment):", updateResponse.data.status); // Success message
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
        setError(response.data.status || "Unknown error");
      }
    } catch (err) {
      setError("An error occurred while initiating the purchase.");
      console.error(err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              <div className="app-brand demo" style={{ background: "#1C4481" }}>
                <a href="" className="app-brand-link">
                  <img
                    src="/logo1.png"
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
                  <Link to={`/Dashboard/${corp_id}`} className="menu-link text-decoration-none">
                    <img
                      src="/dashboard-active.svg"
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
                        src="/down-arrow.png"
                        alt=""
                        width="30px"
                        height="20px"
                      />
                    </span>
                  </Link>
                  <div className="collapse" id="collapseProfile">
                    <ul>
                      <li className="menu-item mt-2">
                        <Link to={`/ViewProfile/${corp_id}`} className="text-white text-decoration-none">
                          <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                        </Link>
                      </li>
                      <li className="menu-item my-2">
                        <a href="#tr" className="text-white text-decoration-none">
                          <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo Update
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
                    />
                    <span className="mx-2 text-white"> Plan</span>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link
                    to={`/TransectionPage/${corp_id}`}
                    className="menu-link text-decoration-none"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white"> Transection</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="menu-link mx-3 text-decoration-none">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />{" "}
                    <span className="mx-2 text-white">Logout</span>
                  </Link>
                </li>
              </ul>
            </aside>

            {/* Content Area */}
            <div className="layout-page bg-white">
              <div className="container h-15vh">
                <div className="row mt-3 align-items-center justify-content-center">
                  <h4 className="d-flex justify-content-center fs-2">{planData ? planData.plan_name : "0"}</h4>
                </div>

                <div className="row justify-content-center mt-5">
                  <div className="col-md-6 col-lg-4">
                    <Card className="shadow-lg p-3 mb-5 rounded">
                      <Card.Body className="text-center">
                        <Card.Title className="fs-1">
                          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                            {planData ? planData.plan_name : "0"}
                          </p>
                        </Card.Title>

                        {/* Display the Actual Price and Discounted Price */}
                        <p className="plan-price fs-2 fw-bold text-success">
                          ${planData ? planData.total_cost : "39.99"} / Month
                        </p>

                        {/* Calculate and display the discounted price */}
                        {planData && planData.discount && planData.total_cost && (
                          <p className="plan-price fs-2 fw-bold text-danger">
                            Discounted Price: $
                            {(
                              (planData.total_cost -
                                (planData.total_cost * planData.discount) / 100)
                            ).toFixed(2)} / Month
                          </p>
                        )}

                        <p>
                          <strong>Discount:</strong> {planData ? planData.discount : "0"}%
                        </p>

                        <p>
                          <strong>Time Limit:</strong> {planData ? planData.time_limt : "0"}
                        </p>

                        <p>
                          <strong>Storage:</strong> {planData ? planData.total_storage : "20"} GB
                        </p>
                        <p>
                          <strong>Number of Exams:</strong> {planData ? planData.no_of_exam : "10"}
                        </p>

                        <Button
                          onClick={handleBuyNow}
                          className="btn btn-primary"
                          disabled={isProcessingPayment}
                        >
                          {isProcessingPayment ? "Processing..." : "Buy Now"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PlanDetails;
