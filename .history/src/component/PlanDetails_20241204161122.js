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

        // Razorpay Payment Options
        var options = {
          key: sdkKey, // Razorpay SDK key
          amount: paymentDetails.amount * 100, // Amount in the smallest currency unit (INR, paisa)
          currency: paymentDetails.currency,
          name: "Your Company Name",
          description: "Subscription Plan Payment",
          order_id: paymentDetails.id, // Order ID
          receipt: paymentDetails.receipt,
          theme: {
            color: "#528FF0", // Theme color
          },
          handler: async function (response) {
            // Handle successful payment here
            alert("Payment Successful!");
            const razorpayPaymentId = response.razorpay_payment_id; // Get the Razorpay payment ID
            const razorpayOrderId = response.razorpay_order_id; // Get the Razorpay order ID

            // Step 4: Update payment status with your API
            try {
              const updateResponse = await axios.post(
                "http://103.35.121.219:4000/corp/subscription/updatePayment", // API endpoint to update payment
                {
                  corp_id: corp_id,
                  id_plan: id_plan,
                  id_payment: paymentDetails.id_payment, // The id of the payment from the response
                  razorpay_payment_id: razorpayPaymentId, // The Razorpay payment ID
                },
                {
                  headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                  },
                }
              );

              if (updateResponse.data.code === 1000) {
                console.log("Payment status updated successfully:", updateResponse.data);
                // Redirect to success page or dashboard
                // navigate(`/payment-success/${paymentDetails.id}`);
                navigate(`/Dashboard/${corp_id}`);
              } else {
                console.error("Failed to update payment status:", updateResponse.data);
              }
            } catch (err) {
              console.error("Error while updating payment status:", err);
              setError("An error occurred while updating the payment status.");
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
                <a href="" className="app-brand-link">
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
                    />
                    <span className="mx-2 text-white"> Plan</span>
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

            <div className="layout-page bg-white">
              <div className="container h-15vh">
                <div className="row mt-3 align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Buy Now</h4>
                  </div>
                  <div className="col-lg-4">
                    <div className="row justify-content-end">
                      <div className="col-lg-6">
                        <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                          <img
                            src="../d-user.svg"
                            alt="d-user"
                            className="img-fluid"
                            width="50px"
                          />
                          <h6 className="ms-2 mb-0">
                            <span className="text-primary lh-1">Welcome</span>{" "}
                            <br /> User TP
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              style={{ color: "grey" }}
                            />
                            <a href="">
                              <FontAwesomeIcon
                                icon={faSignOutAlt}
                                style={{ color: "grey" }}
                              />
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section id="plans" style={{ width: "700px", marginLeft: "132px" }}>
              
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
                            <strong>Time Limit:</strong>{" "}
                            {planData ? planData.time_limt : "0"}
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

              {/* Features Section */}
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