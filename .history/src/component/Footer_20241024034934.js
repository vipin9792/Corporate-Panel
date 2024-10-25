import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
      <footer className=" text-light pt-4" style={{ background: "#1C4481" }}>
      <div className="container">
        <div className="row ">
          {/* <div className="col-md-4  mb-3 ">
            <h5 className='text-sm text-danger fw-bold'>SPIWD</h5>
            <img src="logo1.png" alt="logo" className='img-fluid' style={{width:"200px" ,height:"80px"}} />
           
            <ul className="list-unstyled "><br />
             
              <li className='text-center'>
                <FontAwesomeIcon icon={faMapMarkerAlt} />&nbsp;&nbsp; Lower Ground Floor & Third Floor, G-5,
                Sector-3, Noida UP India-201301
              </li><br />
            </ul>
           
          </div> */}
          {/* <div className="col-md-4  mb-3">
            <h4 className='text-sm text-danger fw-bold'>Phone</h4>
            <ul className="list-unstyled ">
              <li><a href="#" className="text-light text-decoration-none"> +91-120-4277376,</a></li>
              <li><a href="#" className="text-light text-decoration-none">+91-8130-294-298</a></li>
              <li><a href="#" className="text-light text-decoration-none"><i className="bi bi-envelope-fill"></i>&nbsp;&nbsp;info@pareekshn.com</a></li>
             
            </ul>
          </div>
          */}
          {/* <div className="col-md-4  mb-3">
            <h4 className='text-sm text-danger fw-bold'>Open Hours</h4>
            <ul className="list-unstyled">
              <li><FontAwesomeIcon icon={faClock} /> Monday: Thursday: 9:00am -5:00pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Friday: 9:00am - 4:00pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Saturday: 9:00am - 1:30pm</li>
              <li><FontAwesomeIcon icon={faClock} /> Sunday: 9:30am - 12:00pm</li>
            </ul>
            <div className="footer-social mt-3">
              <a href="#" className="text-light me-2"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="text-light me-2"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="text-light"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div> */}
        </div>
        


        <div className="row">
          <div className="col-sm-4 ">
            <a href="#" className="text-light text-decoration-none">Privacy  |  Terms and Conditions</a>
          </div>
          <div className="col-sm-8 text-end">
            <p className="mb-0">©2024 | All Rights Reserved | Align Communications, Inc.</p>
          </div>
        </div>
      </div>
    </footer>


    </div>
  )
}

export default Footer
