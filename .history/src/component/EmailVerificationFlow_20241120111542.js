import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerificationFlow = () => {
  const location = useLocation(); // To access query params in the URL
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [corpId, setCorpId] = useState(null);
  const [email, setEmail] = useState('');

  // Extract corpId and email from the query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const retrievedCorpId = queryParams.get('corpId');
    const retrievedEmail = queryParams.get('email');

    // Check if corpId and email exist in the query params
    if (retrievedCorpId && retrievedEmail) {
      setCorpId(retrievedCorpId);
      setEmail(retrievedEmail);
    } else {
      setError('Invalid link. corpId or email is missing.');
    }
  }, [location.search]); // Trigger this when the location changes

  // Resend OTP logic
  const resendOTP = async () => {
    if (corpId && email) {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/resendOTP', // Replace with the correct API endpoint
          {
            corp_id: corpId,
            email: email,
          },
          {
            headers: {
              Authorization: `Bearer your-token-here`, // Add the appropriate token here
            },
          }
        );

        if (response.data.code === 1000) {
          setMessage('OTP sent to your email!');
          setError('');
        } else {
          setError('Error sending OTP, please try again.');
        }
      } catch (err) {
        setError('Error occurred while resending OTP.');
        console.error('Resend OTP Error:', err);
      }
      setLoading(false);
    }
  };

  // OTP verification logic
  const verifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }

    if (corpId) {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/verifyOTP', // Replace with the correct API endpoint
          {
            corp_id: corpId,
            otp: otp,
          },
          {
            headers: {
              Authorization: `Bearer your-token-here`, // Add the appropriate token here
            },
          }
        );

        if (response.data.code === 1000) {
          setMessage('OTP Verified successfully!');
          setError('');
          // Redirect to the dashboard after OTP verification
          navigate('/Dashboard1');
        } else {
          setError('Invalid OTP, please try again.');
        }
      } catch (err) {
        setError('An error occurred during OTP verification.');
        console.error('Verify OTP Error:', err);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <section>
        <div className="row credential">
          <div className="col-lg-6 bg-primary text-white bg-icons">
            <div className="imageicon">
              <img src="logo1.png" alt="logo" id="logo" />
              <img src="pen-scale.svg" alt="bg-icon-1" />
              <img src="boy.svg" alt="boy" />
              <img src="bulb1.svg" alt="bulb1" />
              <img src="computer-person.svg" alt="computer-person" />
            </div>
            <div className="warapper-form">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <button onClick={() => navigate('/Login')} className="btn-primary rounded-circle goBack">
                  <img src="arrow-left.svg" alt="go back" />
                </button>
                <h4 className="text-secondary text-end">Email <br /> <span className="text">Verification</span></h4>
              </div>

              <div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                {/* OTP input */}
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                    placeholder="Enter OTP"
                    maxLength="6"
                  />
                </div>

                <button
                  type="button"
                  onClick={verifyOTP}
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Verifying OTP...' : 'Verify OTP'}
                </button>

                {/* Resend OTP button */}
                <button
                  type="button"
                  onClick={resendOTP}
                  className="btn btn-secondary w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? 'Resending OTP...' : 'Resend OTP'}
                </button>
              </div>
            </div>
          </div>
          {/* Other section or slider */}
        </div>
      </section>
    </div>
  );
};

export default EmailVerificationFlow;
