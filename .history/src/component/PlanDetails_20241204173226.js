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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="layout-wrapper flex-grow-1">
          <div className="layout-container">
            {/* Sidebar */}
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              {/* Sidebar Content */}
            </aside>

            <div className="layout-page bg-white">
              <div className="container h-15vh">
                {/* Header Content */}
              </div>

              <section className="hero bg-primary text-white text-center py-5">
                <Container>
                  <h1>Get Ready for Your Plan</h1>
                  <p>
                    Subscribe to the best online exam platform. Choose a plan
                    that fits your needs!
                  </p>
                </Container>
              </section>

              {/* Subscription Plan Section */}
              <section id="plans" style={{ width: "700px", marginLeft: "132px" }}>
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

              {/* Features Section in 3 Columns */}
              <section className="bg-light">
                <Container>
                  <div
                    className="fw-b text-success"
                    style={{
                      fontSize: "26px",
                      marginLeft: "182px",
                      marginTop: "12px",
                    }}
                  >
                    Features:
                  </div>
                  <Row className="justify-content-center">
                    {planData && planData.features ? (
                      planData.features.map((feature) => (
                        <Col key={feature.id_subscription} md={4}>
                          <Card className="shadow-sm" style={{ border: "none" }}>
                            <Card.Body>
                              <p style={{ fontSize: "16px", lineHeight: "0.001" }}>
                                {feature.subscription_display_name}
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <Col>
                        <Card className="shadow-sm" style={{ border: "none" }}>
                          <Card.Body>No features available.</Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Row>
                </Container>
              </section>

              <div className="mt-4" style={{ position: "absolute", left: "60%", top: "38%" }}>
                <button className="btn btn-success btn-md ms-2">Buy Now</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="footer text-white text-center p-3"
          style={{
            background: "#1C4481",
            borderTop: "1px solid #fff",
            marginTop: "auto",
            position: "relative", 
            bottom: 0, 
            width: "100%" 
          }}
        >
          <div className="container">
            <p>&copy; {new Date().getFullYear()} SP Institute of Workforce Development Pvt Ltd (SPIWD). All rights reserved.</p>
            <div style={{ marginTop: "-10px" }}>
              <Link
                to="/about"
                style={{ color: "white", margin: "0 15px" }}
                className="text-decoration-none"
              >
                About
              </Link>
              <Link
                to="/privacy"
                style={{ color: "white", margin: "0 15px" }}
                className="text-decoration-none"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                style={{ color: "white", margin: "0 15px" }}
                className="text-decoration-none"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PlanDetails;
