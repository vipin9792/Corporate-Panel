import React, { useState } from "react";
import axios from "axios";

const SignupForm = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtpPopupVisible, setIsOtpPopupVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Bearer Token
  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Password strength validation
  const isPasswordStrong = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // Simulate OTP validation (replace with actual API request)
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError(""); // Reset OTP error message

    // Simulating OTP validation. You should replace this with an actual API request.
    if (otp === "123456") { // Example OTP validation
      setSuccessMessage("OTP verified successfully!");
      setIsOtpPopupVisible(false); // Close OTP popup after success
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Basic client-side validation
    if (!isPasswordStrong(formData.passwd)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter and one number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true); // Set loading state

    // Debugging: log the formData before making the request
    console.log("Form Data:", formData);

    try {
      // Send POST request to the signup API with Bearer Token in the Authorization header
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          }
        }
      );

      // Debugging: log the response from the server
      console.log("API Response:", response);

      // If signup is successful, show success message and show OTP popup
      if (response.status === 200) {
        setSuccessMessage("Signup successful! Please check your email for the OTP.");
        setIsOtpPopupVisible(true); // Show OTP verification popup
        onSignUpSuccess();  // Optionally call this to handle actions after successful signup (e.g., redirect to login page)
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);

      // Check for specific error types
      if (error.response) {
        // If the server responds with an error
        setErrorMessage(error.response.data.message || "Signup failed. Please try again later.");
      } else if (error.request) {
        // If no response was received from the server
        setErrorMessage("Network error. Please check your internet connection.");
      } else {
        // If some other error occurred
        setErrorMessage("An error occurred while processing your request.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>
        <div>
          <label htmlFor="emailId">Email ID:</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div>
          <label htmlFor="userid">User ID:</label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            placeholder="Create a user ID"
            required
          />
        </div>
        <div>
          <label htmlFor="passwd">Password:</label>
          <input
            type="password"
            id="passwd"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            placeholder="Create a password"
            required
            autoComplete="new-password" // Prevent autofill on password
          />
        </div>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {/* OTP Popup */}
      {isOtpPopupVisible && (
        <div className="otp-popup">
          <div className="popup-content">
            <h3>Verify OTP</h3>
            <form onSubmit={handleOtpSubmit}>
              <div>
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter OTP"
                  required
                />
              </div>
              {otpError && <p style={{ color: "red" }}>{otpError}</p>}
              <button type="submit">Verify OTP</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
