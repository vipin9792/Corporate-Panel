import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Slider from "./Slider";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState(Array(4).fill('')); // 4 inputs for OTP
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract corpId from the URL params
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get("corpId");

  // If corpId is missing, redirect to home
  useEffect(() => {
    if (!corpId) {
      alert("Error: Missing corpId in URL. Please provide a valid corpId.");
      navigate("/"); // Redirect user to home page or error page
    }
  }, [corpId, navigate]);

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your actual token

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1); // Get only the first character
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // Focus next input
    }
  };

  // Handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus previous input
    }
  };

  // Handle OTP submission and verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    setSuccessMessage('');
    setLoading(true);

    const otpValue = otp.join(''); // Join OTP digits
    console.log("OTP Value: ", otpValue);  // Debugging log

    // Validate OTP length
    if (!otpValue || otpValue.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      // Make API call to verify OTP
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP', // API endpoint
        { otp: otpValue, corp_id: corpId },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      // Debugging response
      console.log("API Response: ", response);

      // Check for success response from API
      if (response.status === 200 && response.data.status === 'Response successful complete!!') {
        setProfile(response.data.profile);  // Set profile data if OTP is verified
        setSuccessMessage('OTP verified successfully! You can now log in.');
      } else {
        setOtpError(response.data.status || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      // Log error details
      console.error("Error verifying OTP: ", error);
      setOtpError('An error occurred while verifying the OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOtp = () => {
    setOtp(Array(4).fill('')); // Clear the OTP input fields
    setOtpError('');
    setSuccessMessage('');
    alert('OTP has been resent!'); // Implement resend logic
  };

  return (
    <section>
      <div className="row credential">
        <div className="col-lg-6 bg-primary text-white bg-icons"><br /><br />
          <div className="imageicon">
            <img src="logo1.png" alt="logo" id="logo" className='demo_sec' />
            <img src="pen-scale.svg" alt="" />
            <img src="boy.svg" alt="boy" />
            <img src="bulb1.svg" alt="bg-icon-3" />
            <img src="computer-person.svg" alt="bg-icon-8" />
          </div>
          <div className="wrapper-inner mt-5">
            <form
              className="bg-white signupForm"
              style={{
                maxWidth: '440px',
                borderRadius: '60px',
                height: '410px',
                margin: 'auto',
                padding: 'px',
                marginTop: '104px',
                overflow: 'hidden'
              }}
            >
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <Container className="mt-5">
                    <h2 className="text-center text-primary fs-3 fw-bold">Verify OTP</h2>
                    <h6 className="text-center text-secondary my-4 ">Enter Four Digit Code Sent To Your Email</h6>
                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3 justify-content-center">
                        {otp.map((digit, index) => (
                          <Col key={index} xs="auto">
                            <Form.Control
                              type="text"
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handleChange(e, index)}
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
                      <Button type="button" className="w-100 rounded-pill text-white" onClick={handleResendOtp}>
                        Resend OTP
                      </Button>
                    </Form>

                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {otpError && <p style={{ color: 'red' }}>{otpError}</p>}

                    {/* Display profile information if OTP is verified */}
                    {profile && (
                      <div className="profile-info mt-4">
                        <h3>Company: {profile.company_name}</h3>
                        <p>Email: {profile.email}</p>
                        <p>Phone: {profile.phone_no}</p>
                        <p>Address: {profile.address}</p>
                        <img src={profile.logo} alt="Company Logo" width="100" />
                      </div>
                    )}
                  </Container>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Slider />
      </div>
    </section>
  );
};

export default OtpVerify;
