import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from './Slider';
import { verifyOtp, resendOtp } from './otpApi'; // Import API functions

const EmailVerificationFlow = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [corpId, setCorpId] = useState(null); // Initialize corpId state as null
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const registeredCorpId = queryParams.get('corpId');  
  const registeredEmail = queryParams.get('email'); 

  useEffect(() => {
    if (registeredCorpId) {
      setCorpId(registeredCorpId);
    }
    if (registeredEmail) {
      setEmail(registeredEmail);
    }
  }, [registeredCorpId, registeredEmail]);

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(0, 1); // Ensure only 1 digit per input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // Focus next input on input
    }
  };

  // Handle backspace key for OTP input
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus previous input on backspace
    }
  };

  // Handle OTP verification
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
      const response = await verifyOtp(corpId, email, otpValue); // Use verifyOtp function

      if (response.code === 1000) {
        setSuccessMessage('OTP verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/ThankuPage');
      } else {
        setOtpError(`OTP verification failed: ${response.status}`);
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setOtpError('An error occurred during OTP verification.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!corpId || !email) {
      alert("Missing corpId or email. Please ensure these are set correctly.");
      return;
    }

    setResendLoading(true);

    try {
      const response = await resendOtp(corpId, email); // Use resendOtp function

      if (response.code === 1000) {
        alert('OTP has been resent to your email.');
      } else {
        alert(`Error: ${response.status}. Please check the data you provided.`);
      }
    } catch (error) {
      console.error('Error while resending OTP:', error);
      alert('An error occurred while resending the OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section>
      <div className="row credential">
        <div className="col-lg-6 bg-primary text-white bg-icons">
          <div className="imageicon">
            <img src="logo1.png" alt="logo" id="logo" style={{ mixBlendMode: 'luminosity', opacity: '0.8' }} />
            <img src="pen-scale.svg" alt="" />
            <img src="boy.svg" alt="boy" />
            <img src="bulb1.svg" alt="bg-icon-3" />
            <img src="computer-person.svg" alt="bg-icon-8" />
          </div>
          <div className="wrapper-inner mt-5">
            <Container className="bg-white" style={{ width: '400px', padding: '20px', borderRadius: '30px', marginTop: '173px' }}>
              <h2 className="text-center text-primary fs-3 fw-bold">Verify OTP</h2>
              <h6 className="text-center text-secondary my-4">Enter Four Digit Code Sent To Your Email</h6>

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
                <Button type="submit" className="mb-1 rounded-pill text-white" disabled={loading} style={{ marginLeft: '52px', width: '250px' }}>
                  {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </Button><br />
                <Button
                  type="button"
                  className="rounded-pill text-white"
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  style={{ marginLeft: '52px', width: '250px' }}>
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
