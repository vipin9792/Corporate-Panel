import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Changed from 'useHistory' to 'useNavigate'

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams();  // Retrieve params for corp_id and id_plan from URL
  const navigate = useNavigate();  // This replaces useHistory
  const [planData, setPlanData] = useState(null);  // Holds plan data fetched from API
  const [loading, setLoading] = useState(false);  // State to track loading
  const [error, setError] = useState(null);  // Error handling state

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Use the Bearer Token here

  useEffect(() => {
    // Fetch plan details based on corp_id and id_plan from URL params
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

  // Redirect to product details page with query string
  const handleBuyNow = () => {
    navigate(`/product-details.html?plan=standard`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <Container>
          <h1>Get Ready for Your Exam</h1>
          <p>Subscribe to the best online exam platform. Choose a plan that fits your needs!</p>
        </Container>
      </section>

      {/* Subscription Plan Section */}
      <section id="plans" className="my-5">
        <Container>
          <h2 className="text-center mb-4">Standard Plan</h2>
          <Row className="justify-content-center">
            {/* Single Plan (Standard Plan) */}
            <Col md={8}>
              <Card className="shadow-sm mb-4 rounded-3">
                <Card.Body className="text-center">
                  <Card.Title className="fs-1">plan.name}</Card.Title>
                  <p className="plan-price fs-2 fw-bold text-success">
                    ${planData ? planData.total_cost : "39.99"} / Month
                  </p>
                  <p><strong>Discount:</strong> {planData ? planData.discount : "0"}%</p>
                  <p><strong>Storage:</strong> {planData ? planData.total_storage : "20"} GB</p>
                  <p><strong>Number of Exams:</strong> {planData ? planData.no_of_exam : "10"}</p>
                  <p>Access to all exams, quizzes, and tutorials. Unlimited question attempts.</p>
                  <p>2-month validity. Priority customer support.</p>
                  <Button variant="primary" size="lg" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Description and Features Section */}
      <section className="bg-light py-5">
        <Container className="text-center">
          <h3 className="mb-4">Why Choose the Standard Plan?</h3>
          <p className="lead mb-4">
            The Standard Plan offers comprehensive access to all the necessary tools you need to prepare for exams and succeed. Here are the key features:
          </p>
          <ul className="list-unstyled">
            {planData && planData.features ? (
              planData.features.map((feature) => (
                <li key={feature.id_subscription} className="fs-5 mb-3">
                  <strong>{feature.subscription_display_name}</strong>
                </li>
              ))
            ) : (
              <li>No features available.</li>
            )}
          </ul>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-light py-4 text-center">
        <p>Contact us at: support@examportal.com</p>
        <p>&copy; 2024 Online Exam Portal</p>
      </footer>
    </div>
  );
};

export default PlanDetails;
