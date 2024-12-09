

















import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from './Slider';  // Assuming this is needed for your UI

const ResetPassword = () => {
  const { token, corpId } = useParams();  // Get both token and corpId from the URL
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');  // OTP state
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

                {/* Reset Password Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* OTP Field */}
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingOtp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}  // Capture OTP input
                          required
                        />
                        <label htmlFor="floatingOtp">
                          <span>
                            <img src="otp-icon.svg" alt="OTP Icon" className="icon" />&nbsp;
                          </span>
                          OTP*
                        </label>
                      </div>
                    </div>

                    {/* New Password Field */}
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingPassword">
                          <span>
                            <img src="password.svg" alt="Password Icon" className="icon" />&nbsp;
                          </span>
                          New Password*
                        </label>
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingConfirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingConfirmPassword">
                          <span>
                            <img src="password.svg" alt="Password Icon" className="icon" />&nbsp;
                          </span>
                          Confirm Password*
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <button type="submit" className="btn btn-primary rounded-pill w-100">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Error or Success Message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
              </div>
            </div>

            {/* Slider Component */}
            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
















// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ResetPassword1 = () => {
//   const { token, corpId } = useParams();  // Get both token and corpId from the URL
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

//   // Ensure the token and corpId are present
//   useEffect(() => {
//     if (!token || !corpId) {
//       setError('Invalid or expired token/corpId.');
//       alert('Token or corpId is missing or invalid!');
//       console.log('Token or corpId is missing!');
//     } else {
//       console.log('Token and Corp ID received:', token, corpId);
//     }
//   }, [token, corpId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match.');
//       alert('Passwords do not match!');
//       return;
//     }

//     console.log("Sending API request with the following data:", {
//       corp_id: corpId,
//       otp: otp,
//       new_password: newPassword,
//       token: token  // Log the token and corpId being used
//     });

//     try {
//       const response = await axios.post(
//         'http://103.35.121.219:4000/corp/recovery/resetPassword',  // Reset password API
//         {
//           corp_id: corpId,  // Use the corpId passed from ForgetPassword
//           otp: otp,         // OTP entered by the user
//           new_password: newPassword,  // New password
//           token: token,     // The token retrieved from the URL
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${BEARER_TOKEN}`,  // **Use the Bearer token in the Authorization header**
//           },
//         }
//       );

//       console.log('Reset password API response:', response);

//       if (response.data.code === 1000) {
//         setMessage('Password successfully reset!');
//         alert('Password successfully reset!');
//         console.log('Password reset success!');
//         setTimeout(() => {
//           navigate('/LoginForm');  // Redirect to login page
//         }, 2000);
//       } else {
//         setError(response.data.message || 'Failed to reset password.');
//         alert('Failed to reset password.');
//         console.log('Failed to reset password:', response.data.message);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('An error occurred while resetting the password.');
//       alert('An error occurred during password reset!');
//       console.log('Error details:', err);
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {message && <p style={{ color: 'green' }}>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>OTP:</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}  // Capture OTP input
//             required
//           />
//         </div>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword1;
