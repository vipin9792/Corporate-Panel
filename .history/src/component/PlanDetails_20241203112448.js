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
                  <Card.Title className="fs-1">
   
                  <p> {planData ? planData.plan_name : "0"}</p>




                  </Card.Title>







                  <p className="plan-price fs-2 fw-bold text-success">
                    ${planData ? planData.total_cost : "39.99"} / Month
                  </p>
                  <p><strong>Discount:</strong> {planData ? planData.discount : "0"}%</p>
                  <p><strong>Storage:</strong> {planData ? planData.total_storage : "20"} GB</p>
                  <p><strong>Number of Exams:</strong> {planData ? planData.no_of_exam : "10"}</p>
                 
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
      <section className="bg-light py-2">
        <Container className="text-center">
          
          <ul className="list-unstyled"><span className="fw-b text-success fs-4 text-al">Features:</span>
            {planData && planData.features ? (
              planData.features.map((feature) => (
                <li key={feature.id_subscription}  style={{fontSize:"16px",textAlign:"center"}}>
                 {feature.subscription_display_name}
                </li>
              ))
            ) : (
              <li>No features available.</li>
            )}
          </ul>
        </Container>
      </section>

     
    </div>
  );
};

export default PlanDetails;
