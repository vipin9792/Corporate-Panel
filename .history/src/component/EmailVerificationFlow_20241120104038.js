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
  const [email, setEmail] = useState('');
  const [corpId, setCorpId] = useState('');
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const corpId = queryParams.get('corpId');
    const email = queryParams.get('email');
    setCorpId(corpId);
    setEmail(email);
  }, [location]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index]) {
      if (index > 0) inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOtpError('');
    setSuccessMessage('');

    const enteredOtp = otp.join('');
    
    if (enteredOtp.length < 4) {
      setOtpError('Please enter a complete OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verify-otp',
        { corp_id: corpId, otp: enteredOtp, email: email },
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );

      if (response.status === 200) {
        setSuccessMessage('OTP verified successfully!');
        navigate('/dashboard'); // Redirect to dashboard after successful verification
      } else {
        setOtpError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setOtpError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    setOtpError('');
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resend-otp',
        { corp_id: corpId, email: email },
        { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } }
      );

      if (response.status === 200) {
        setSuccessMessage('OTP resent successfully!');
      } else {
        setOtpError('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      setOtpError('An error occurred while resending OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Slider />
        </Col>
        <Col lg={6}>
          <div className="otp-form">
            <h4>Verify Your OTP</h4>
            {otpError && <Alert variant="danger">{otpError}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={handleSubmitOtp}>
              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => inputRefs.current[index] = el}
                    className="otp-input"
                  />
                ))}
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>

              <Button
                variant="link"
                onClick={resendOtp}
                disabled={resendLoading}
              >
                {resendLoading ? 'Resending OTP...' : 'Resend OTP'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailVerificationFlow;
