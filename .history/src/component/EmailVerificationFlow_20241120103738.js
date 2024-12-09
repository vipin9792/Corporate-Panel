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
  const [corpId, setCorpId] = useState(null); // Initialize corpId state as null
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const registeredCorpId = queryParams.get('corpId');  // Get corpId from query params
  const registeredEmail = queryParams.get('email'); // Get email from query params

  useEffect(() => {
    // Set corpId and email if available from query parameters
    if (registeredCorpId) {
      setCorpId(registeredCorpId);
    }
    if (registeredEmail) {
      setEmail(registeredEmail);
    }
  }, [registeredCorpId, registeredEmail]);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(0, 1); // Ensure only 1 digit per input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // Focus next input on input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Move to previous input if backspace is pressed
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
        {
          corp_id: corpId,
          otp: enteredOtp,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
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
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
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
