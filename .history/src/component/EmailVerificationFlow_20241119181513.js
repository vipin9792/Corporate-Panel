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

  const queryParams = new URLSearchParams(location.search);
  const registeredCorpId = queryParams.get('corpId');  // Get corpId from query params
  const registeredEmail = queryParams.get('email'); // Get email from query params

  // Log the full query string to debug
  console.log('Location Search:', location.search);

  useEffect(() => {
    if (registeredCorpId) {
      setCorpId(registeredCorpId);
    }
    if (registeredEmail) {
      setEmail(registeredEmail);
    }

    console.log('corpId from query params:', registeredCorpId);
    console.log('Email from query params:', registeredEmail);
  }, [registeredCorpId, registeredEmail]);

  // Your Bearer Token (ensure it's handled securely in production)
  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
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
        { corp_id: corpId, email, otp: otpValue },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        }
      );

      console.log('Verify OTP Response:', response);

      if (response.status === 200 && response.data.code === 1000) {
        setSuccessMessage('OTP verified successfully! You can now log in.');
        alert('OTP Verified Successfully! You can now login.');
        navigate('/LoginForm');
      } else {
        setOtpError(`OTP verification failed: ${response.data.status}`);
        alert('OTP Verification Failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setOtpError('An error occurred during OTP verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!corpId || !email) {
      alert("Missing corpId or email. Please ensure these are set correctly.");
      console.log('corpId:', corpId);
      console.log('email:', email);
      return;
    }

    setResendLoading(true);
    console.log('Resending OTP with corp_id:', corpId);
    console.log('Email:', email);

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/resendOTP',
        { corp_id: corpId, email },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`
          }
        }
      );

      console.log('Resend OTP Response:', response);

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
      console.error('Error while resending OTP:', error);
      alert('An error occurred while resending the OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section>
      {/* Your JSX code */}
    </section>
  );
};

export default EmailVerificationFlow;