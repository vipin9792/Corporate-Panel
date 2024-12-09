import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [otpError, setOtpError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the corpId from the URL search params
  const queryParams = new URLSearchParams(location.search);
  const corpId = queryParams.get("corpId");  // This is how you extract the corpId from the URL

  useEffect(() => {
    if (!corpId) {
      alert("Error: Missing corpId in URL. Please provide a valid corpId.");
      navigate("/"); // Redirect to home or a specific page
    }
  }, [corpId, navigate]);

  const BEARER_TOKEN = 'YOUR_BEARER_TOKEN_HERE';  // Replace with your actual Bearer Token

  // Handle OTP input changes
  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus(); // Focus next input field
    }
  };

  // Handle backspace in OTP input fields
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus previous input field
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    setSuccessMessage('');
    setLoading(true);

    const otpValue = otp.join(''); // Combine OTP digits into one string

    // Validate OTP length
    if (!otpValue || otpValue.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      // Log the OTP value and corpId for debugging
      console.log('OTP:', otpValue);
      console.log('corpId:', corpId);

      const response = await axios.post(
        'http://103.35.121.219:4000/corp/verifyOTP',  // Replace with actual API URL
        { otp: otpValue, corp_id: corpId },  // Pass corpId and OTP value
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      // Log the full response for debugging
      console.log('Response from API:', response);

      if (response.status === 200 && response.data.code === 1000) {
        setSuccessMessage('OTP verified successfully!');
        // Optionally, navigate to a different page
      } else {
        setOtpError(response.data.status || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);

      if (error.response && error.response.data) {
        // Check for token mismatch error
        if (error.response.data.code === 1003) {
          setOtpError('APP Token Mismatch or Broken. Please check the token.');
        } else {
          setOtpError(error.response.data.status || 'An error occurred while verifying the OTP.');
        }
      } else {
        setOtpError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="row credential">
        <div className="col-lg-6 bg-primary text-white">
          <div className="wrapper-inner mt-5">
            <h2 className="text-center text-primary fs-3 fw-bold">Verify OTP</h2>
            <h6 className="text-center text-secondary my-4">Enter Four Digit Code Sent To Your Email</h6>
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-center mb-3">
                {otp.map((digit, index) => (
                  <div key={index} className="col-2">
                    <input
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => inputRefs.current[index] = el}
                      style={{ width: '50px', height: '50px', textAlign: 'center' }}
                    />
                  </div>
                ))}
              </div>
              <button type="submit" disabled={loading} className="w-100 mb-3 btn btn-primary">
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
              {otpError && <div className="text-danger">{otpError}</div>}
              {successMessage && <div className="text-success">{successMessage}</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Otp;
