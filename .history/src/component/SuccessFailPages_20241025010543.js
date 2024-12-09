import React, { useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SuccessFailPages = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <Container style={{ padding: '3rem' }}>
      <Row className="text-center">
        <Col>
          <Button
            variant="success"
            className="m-1"
            onClick={() => setShowSuccess(true)}
          >
            Success Modal
          </Button>
          <Button
            variant="danger"
            className="m-1"
            onClick={() => setShowError(true)}
          >
            Error Modal
          </Button>
        </Col>
      </Row>

      {/* Error Modal */}
      <Modal show={showError} onHide={() => setShowError(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="text-danger">Invalid email!</h4>
          <p>This email is already registered, please login.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowError(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="text-success">Oh Yeah!</h4>
          <p>You have successfully registered and logged in.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccess(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SuccessFailPages;
