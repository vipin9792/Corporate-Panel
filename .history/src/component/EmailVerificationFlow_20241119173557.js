import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from './Slider';

const EmailVerificationFlow = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState(''); // Email state to hold the email value
  const [corpId, setCorpId] = useState(null); // State to store corpId
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const registeredCorpId = queryParams.get('corpId');  // Get corpId from query params
  const registeredEmail = queryParams.get('email');  // Get email from query params (if available)

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Your token

  useEffect(() => {
    // Set the corpId and email from query params if available
    if (registeredCorpId) {
      setCorpId(registeredCorpId);
    }

    if (registeredEmail) {
      setEmail(registeredEmail);
    }

    // Log for debugging
    console.log('corpId from query params:', registeredCorpId);
    console.log('Email from query params:', registeredEmail);
  }, [registeredCorpId, registeredEmail]);

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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setOtpError('');
    setSuccessMessage('');
    setLoading(true);

    if (!otpValue || otpValue.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP',
        { corp_id: corp_id, email, otp: otpValue },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        }
      );

      console.log('Verify OTP Response:', response);  // Log the response for debugging

      if (response.status === 200 && response.data.code === 1000) {
        setSuccessMessage('OTP verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/LoginForm');
      } else {
        setOtpError(`OTP verification failed: ${response.data.status}`);
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error); // Log the error
      setOtpError('An error occurred during OTP verification.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!corpId || !email) {
      alert("Missing corpId or email. Please ensure these are set correctly.");
      console.log('corpId:', corpId); // Log corpId for debugging
      console.log('email:', email); // Log email for debugging
      return;
    }

    setResendLoading(true);  // Set loading state for resend OTP
    console.log('Resending OTP with corp_id:', corpId); // Log for debugging
    console.log('Email:', email); // Log for debugging

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resendOTP',
        { corp_id: corp-Id, email }, // Ensure correct corp_id and email
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        }
      );

      console.log('Resend OTP Response:', response);  // Log the response for debugging

      if (response.status === 200) {
        if (response.data.code === 1000) {
          alert('OTP has been resent to your email.');
        } else {
          alert(`Error: ${response.data.status}. Please check the data you provided.`);
        }
      } else {
        alert('Failed to resend OTP. Please try again later.');
      }
    } catch (error) {
      console.error('Error while resending OTP:', error);  // Log the error for debugging
      alert('An error occurred while resending the OTP.');
    } finally {
      setResendLoading(false);  // Reset resend loading state
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

              <Form onSubmit={handleVerifyOtp}>
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
                  onClick={handleResendOtp}
                  disabled={resendLoading}  // Disable the button while OTP is being resent
                >
                  {resendLoading ? 'Resending OTP...' : 'Resend OTP'}
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

export default EmailVerificationFlow;