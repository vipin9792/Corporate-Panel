import React from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';

const SuccessFailPages = () => {
  return (
    <Container style={{ padding: '3rem' }}>
      <Row className="text-center">
        <Col>
          <Button
            variant="success"
            className="m-1"
            onClick={() => window.$('#statusSuccessModal').modal('show')}
          >
            Success Modal
          </Button>
          <Button
            variant="danger"
            className="m-1"
            onClick={() => window.$('#statusErrorsModal').modal('show')}
          >
            Error Modal
          </Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-start align-items-center flex-column flex-md-row flex-wrap mt-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Col key={index} className="m-3">
            <div
              style={{
                background: `rgba(${index * 50}, ${index * 40}, ${index * 30}, 0.2)`,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '100px',
                height: '100px',
              }}
            />
          </Col>
        ))}
      </Row>

      {/* Error Modal */}
      <Modal id="statusErrorsModal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle className="path circle" fill="none" stroke="#db3646" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
            <line className="path line" fill="none" stroke="#db3646" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
            <line className="path line" fill="none" stroke="#db3646" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
          </svg>
          <h4 className="text-danger mt-3">Invalid email!</h4>
          <p>This email is already registered, please login.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => window.$('#statusErrorsModal').modal('hide')}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal id="statusSuccessModal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle className="path circle" fill="none" stroke="#198754" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
            <polyline className="path check" fill="none" stroke="#198754" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5" />
          </svg>
          <h4 className="text-success mt-3">Oh Yeah!</h4>
          <p>You have successfully registered and logged in.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => window.$('#statusSuccessModal').modal('hide')}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SuccessFailPages;
