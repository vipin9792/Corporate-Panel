import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-3">
            <h3>Lorem Ipsum Dummy Text</h3>
            <ul className="list-unstyled">
              <li>
                <a href="tel:(010) 1234 4321" className="text-light">
                  <FontAwesomeIcon icon={faPhone} /> (010) 1234 4321
                </a>
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> 1 / 105 Bay Lights, <br />Lorem Ipsum, <br />LIC 3201
              </li>
            </ul>
            <a href="#" className="btn btn-danger">Book Now</a>
          </div>
          <div className="col-md-6 col-lg-2 mb-3">
            <h4>Page Links</h4>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Home</a></li>
              <li><a href="#" className="text-light">About</a></li>
              <li><a href="#" className="text-light">Testimonial</a></li>
              <li><a href="#" className="text-light">Blog</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-3 mb-3">
            <h4>More Info</h4>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Lorem ipsum</a></li>
              <li><a href="#" className="text-light">Dolor sit amet</a></li>
              <li><a href="#" className="text-light">Consectetur Adipisicing</a></li>
              <li><a href="#" className="text-light">Ed do eiusmod tempor incididunt</a></li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-4 mb-3">
            <h4>Open Hours</h4>
            <ul className="list-unstyled">
              <li><FontAwesomeIcon icon={faClock} /> Monday - Thursday: 9:00am - 5:00pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Friday: 9:00am - 4:00pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Saturday: 9:00am - 1:30pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Sunday: 9:30am - 12:00pm</li>
            </ul>
            <div className="footer-social mt-3">
              <a href="#" className="text-light me-2"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="text-light me-2"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="text-light"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-sm-4">
            <a href="#" className="text-light">Privacy Policy</a>
          </div>
          <div className="col-sm-8 text-end">
            <p className="mb-0">Lorem ipsum dolor sit amet @ 2019 All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
