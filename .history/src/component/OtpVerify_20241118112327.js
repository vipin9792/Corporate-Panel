import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from './Slider';

const OtpVerify = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get('corpId');  // Extract corpId from URL params

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Your token

  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(0, 1);  // Ensure only 1 digit per input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();  // Focus next input on input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();  // Focus previous input on backspace
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setOtpError('');
    setSuccessMessage('');
    setLoading(true);

    // Validate OTP length
    if (!otpValue || otpValue.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP',
        { otp: otpValue, corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.status === 'Response successful complete!!') {
        setSuccessMessage('OTP verified successfully! You can now log in.');
        // Redirect to login or other page
        navigate('/login');
      } else {
        setOtpError(response.data.status || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      setOtpError('An error occurred while verifying the OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="row credential">
        <div className="col-lg-6 bg-primary text-white bg-icons">
          <div className="imageicon">
            <img src="logo1.png" alt="logo" id="logo" />
            <img src="pen-scale.svg" alt="" />
            <img src="boy.svg" alt="boy" />
            <img src="bulb1.svg" alt="bg-icon-3" />
            <img src="computer-person.svg" alt="bg-icon-8" />
          </div>
          <div className="wrapper-inner mt-5">
            <Container>
              <h2 className="text-center text-primary fs-3 fw-bold">Verify OTP</h2>
              <h6 className="text-center text-secondary my-4">Enter Four Digit Code Sent To Your Email</h6>

              {/* Show success or error messages */}
              {otpError && (
                <Alert variant="danger" className="text-center">
                  {otpError}
                </Alert>
              )}
              {successMessage && (
                <Alert variant="success" className="text-center">
                  {successMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3 justify-content-center">
                  {otp.map((digit, index) => (
                    <Col key={index} xs="auto">
                      <Form.Control
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        style={{ width: '50px', height: '50px', textAlign: 'center' }}
                      />
                    </Col>
                  ))}
                </Row>
                <Button type="submit" className="w-100 mb-3 rounded-pill text-white" disabled={loading}>
                  {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </Button>
                <Button
                  type="button"
                  className="w-100 rounded-pill text-white"
                  onClick={() => alert('OTP has been resent!')} // Resend OTP logic
                >
                  Resend OTP
                </Button>
              </Form>
            </Container>
          </div>
        </div>
        <Slider />
      </div>
    </section>
  );
};

export default OtpVerify;
