import React, { useState } from "react";
import axios from "axios";

const OTPLogin = () => {
  // State for form data and response messages
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);  // Added resend cooldown state

  // API URLs (replace with your actual API URLs)
  const sendOtpUrl = "https://yourapi.com/send-otp";  // Replace with your actual endpoint
  const verifyOtpUrl = "https://yourapi.com/verify-otp";  // Replace with your actual endpoint

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setErrorMessage("Phone number is required.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending OTP request...");
      const response = await axios.post(sendOtpUrl, { phoneNumber });
      console.log("OTP send response:", response.data);  // Log the response data

      if (response.data.success) {
        setOtpSent(true);
        setErrorMessage("");  // Clear any previous error message
      } else {
        setErrorMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);  // Log the error
      setErrorMessage("An error occurred while sending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrorMessage("Please enter the OTP.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Verifying OTP...");
      const response = await axios.post(verifyOtpUrl, { phoneNumber, otp });
      console.log("OTP verification response:", response.data);  // Log the response data

      if (response.data.success) {
        setOtpVerified(true);
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);  // Log the error
      setErrorMessage("An error occurred while verifying OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    console.log("Resend OTP button clicked!");
    if (resendCooldown) {
      console.log("Cooldown active, cannot resend OTP.");
      return; // Prevent multiple requests in a short time
    }

    setResendCooldown(true);  // Activate cooldown
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
    setErrorMessage("");

    console.log("Sending OTP resend request...");

    setIsLoading(true);
    try {
      const response = await axios.post(sendOtpUrl, { phoneNumber });
      console.log("Resend OTP response:", response.data);  // Log the response from the resend request

      if (response.data.success) {
        setOtpSent(true);
        setErrorMessage(""); // Clear any previous error message
        console.log("OTP successfully resent.");
      } else {
        setErrorMessage(response.data.message || "Failed to resend OTP.");
        console.log("Failed to resend OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);  // Log the error
      setErrorMessage("An error occurred while resending OTP. Please try again later.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setResendCooldown(false);  // Reset cooldown after 30 seconds
        console.log("Resend cooldown ended.");
      }, 30000);  // 30 seconds cooldown
    }
  };

  return (
    <div className="otp-login-container">
      <h2>Login with OTP</h2>
      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      {otpSent ? (
        <div>
          <div className="form-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            disabled={isLoading}
            className="submit-btn"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleSendOtp}
          disabled={isLoading}
          className="submit-btn"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!otpVerified && otpSent && (
        <button
          onClick={handleResendOtp}
          disabled={isLoading || resendCooldown}  // Disable button during cooldown
          className="resend-btn"
        >
          {isLoading ? "Resending OTP..." : "Resend OTP"}
        </button>
      )}

      {otpVerified && <p className="success-message">OTP Verified Successfully!</p>}
    </div>
  );
};

export default OTPLogin;
