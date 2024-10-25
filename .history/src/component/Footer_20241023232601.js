import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-md-6 col-lg-3 about-footer">
                <h3>Lorem Ipsum dummy text</h3>
                <ul>
                  <li>
                    <a href="tel:(010) 1234 4321">
                      <FontAwesomeIcon icon={faPhone} /> (010) 1234 4321
                    </a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    1 / 105 Bay Lights,
                    <br />Lorem Ipsum,
                    <br />LIC 3201
                  </li>
                </ul>
                <a href="" className="btn red-btn">Book Now</a>
              </div>
              <div className="col-md-6 col-lg-2 page-more-info">
                <div className="footer-title">
                  <h4>Page links</h4>
                </div>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Testimonial</a></li>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-3 page-more-info">
                <div className="footer-title">
                  <h4>More Info</h4>
                </div>
                <ul>
                  <li><a href="#">Lorem ipsum</a></li>
                  <li><a href="#">Dolor sit amet</a></li>
                  <li><a href="#">Consectetur Adipisicing</a></li>
                  <li><a href="#">Ed do eiusmod tempor incididunt</a></li>
                </ul>
              </div>
              <div className="col-md-6 col-lg-4 open-hours">
                <div className="footer-title">
                  <h4>Open hours</h4>
                  <ul className="footer-social">
                    <li><a href="" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                    <li><a href="" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
                    <li><a href="" target="_blank"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                  </ul>
                </div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td><FontAwesomeIcon icon={faClock} /> Monday - Thursday</td>
                      <td>9:00am - 5:00pm</td>
                    </tr>
                    <tr>
                      <td><FontAwesomeIcon icon={faClock} /> Friday</td>
                      <td>9:00am - 4:00pm</td>
                    </tr>
                    <tr>
                      <td><FontAwesomeIcon icon={faClock} /> Saturday</td>
                      <td>9:00am - 1:30pm</td>
                    </tr>
                    <tr>
                      <td><FontAwesomeIcon icon={faClock} /> Sunday</td>
                      <td>9:30am - 12:00pm</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <div className="footer-logo">
                  <table>
                    <tbody>
                      <tr>
                        <td><img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" alt="Logo" /></td>
                        <td><img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" alt="Logo" /></td>
                        <td><img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" alt="Logo" /></td>
                        <td><img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" alt="Logo" /></td>
                        <td><img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" alt="Logo" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="footer-bottom">
            <div className="row">
              <div className="col-sm-4">
                <a href="">Privacy policy</a>
              </div>
              <div className="col-sm-8">
                <p>Lorem ipsum dolor sit amet @ 2019 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
