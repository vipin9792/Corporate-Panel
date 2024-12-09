import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ExamPortal = () => {
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
                  <Card.Title className="fs-1">Standard Plan</Card.Title>
                  <p className="plan-price fs-2 fw-bold text-success">$39.99 / Month</p>
                  <p>Access to all exams, quizzes, and tutorials. Unlimited question attempts.</p>
                  <p>2-month validity. Priority customer support.</p>
                  <Button variant="primary" size="lg" href="product-details.html?plan=standard">
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
            <li className="fs-5 mb-3">
              <strong>Access to all exams, quizzes, and tutorials</strong> to boost your preparation.
            </li>
            <li className="fs-5 mb-3">
              <strong>Unlimited question attempts</strong> to ensure you can practice until you're confident.
            </li>
            <li className="fs-5 mb-3">
              <strong>2-month validity</strong> gives you plenty of time to prepare for your exams.
            </li>
            <li className="fs-5 mb-3">
              <strong>Priority customer support</strong> to assist you with any issues you might face during your studies.
            </li>
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

export default B;
