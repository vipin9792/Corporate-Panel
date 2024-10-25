import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-light">
      <div className="footer-top">
        <Container>
          <div className="footer-day-time">
            <Row>
              <Col md={8}>
                <ul className="list-unstyled">
                  <li>Opening Hours: Mon - Friday: 8AM - 5PM</li>
                  <li>Sunday: 8:00 AM - 12:00 PM</li>
                </ul>
              </Col>
              <Col lg={4}>
                <div className="phone-no">
                  <a href="tel:+1234567890">
                    <FontAwesomeIcon icon={faMobileAlt} /> Call +12 34 56 78 90
                  </a>
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col lg={4}>
              <h4>About us</h4>
              <p>
                Lorem Ipsum ist einfach Dummy-Text der Druck- und Satzindustrie. Lorem Ipsum war der Standard der Branche.
              </p>
            </Col>
            <Col md={4}>
              <h4>Information</h4>
              <ul className="list-unstyled">
                <li>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Lorem Ipsum 132 xyz Lorem Ipsum
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:info@test.com">info@test.com</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faMobileAlt} /> <a href="tel:1234567890">12 34 56 78 90</a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h4>Follow us</h4>
              <ul className="social-icon list-unstyled d-flex">
                <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom bg-dark text-white">
        <Container>
          <Row>
            <Col sm={5}>
              <p className="copyright text-uppercase">Copyright © 2018</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
