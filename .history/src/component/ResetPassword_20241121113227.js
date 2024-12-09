import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';

const ResetPassword1 = () => {
  const { token, corpId } = useParams();  // Get both token and corpId from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  // Ensure the token and corpId are present
  useEffect(() => {
    if (!token || !corpId) {
      setError('Invalid or expired token/corpId.');
      alert('Token or corpId is missing or invalid!');
      console.log('Token or corpId is missing!');
    } else {
      console.log('Token and Corp ID received:', token, corpId);
    }
  }, [token, corpId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match!');
      return;
    }

    console.log("Sending API request with the following data:", {
      corp_id: corpId,
      otp: otp,
      new_password: newPassword,
      token: token  // Log the token and corpId being used
    });

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/recovery/resetPassword',  // Reset password API
        {
          corp_id: corpId,  // Use the corpId passed from ForgetPassword
          otp: otp,         // OTP entered by the user
          new_password: newPassword,  // New password
          token: token,     // The token retrieved from the URL
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,  // **Use the Bearer token in the Authorization header**
          },
        }
      );

      console.log('Reset password API response:', response);

      if (response.data.code === 1000) {
        setMessage('Password successfully reset!');
        alert('Password successfully reset!');
        console.log('Password reset success!');
        setTimeout(() => {
          navigate('/LoginForm');  // Redirect to login page
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to reset password.');
        alert('Failed to reset password.');
        console.log('Failed to reset password:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while resetting the password.');
      alert('An error occurred during password reset!');
      console.log('Error details:', err);
    }
  };

  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img src="logo1.png" alt="logo" id="logo" />
                <img src="pen-scale.svg" alt="bg-icon-1" />
                <img src="boy.svg" alt="boy" />
                <img src="bulb1.svg" alt="bulb1" />
                <img src="computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form p-5">
                <h4 className="text-secondary my-2 text-center">Reset your password</h4><br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="otp" 
                          name="otp" 
                          placeholder=" " 
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)} // Capture OTP input
                          required 
                        />
                        <label htmlFor="otp">
                          <span>
                            <img src="otp.svg" alt="Icon" className="icon" />&nbsp;
                          </span>
                          OTP*
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          id="newPassword" 
                          name="newPassword" 
                          placeholder=" " 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)} 
                          required 
                        />
                        <label htmlFor="newPassword">
                          <span>
                            <img src="password.svg" alt="Icon" className="icon" />&nbsp;
                          </span>
                          New Password*
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          id="confirmPassword" 
                          name="confirmPassword" 
                          placeholder=" " 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          required 
                        />
                        <label htmlFor="confirmPassword">
                          <span>
                            <img src="password.svg" alt="Icon" className="icon" />&nbsp;
                          </span>
                          Confirm Password*
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <button type="submit" className="btn btn-primary rounded-pill w-100">Continue</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
