import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChangeDetails = () => {
  const { corp_id } = useParams(); // Get `corp_id` from URL params
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [changeType, setChangeType] = useState(''); // to track which change type user selects

  // Handle form submission based on the changeType (password, mobile, email, userId)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (changeType === 'password') {
        // Validate password fields
        if (!oldPassword || !newPassword) {
          setError('Both fields are required');
          return;
        }
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/changePassword',
          {
            corp_id,
            old_password: oldPassword,
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual Bearer token
            },
          }
        );
        if (response.data.code === 1000) {
          setMessage('Password changed successfully!');
        } else {
          setError('Failed to change password');
        }
      } else if (changeType === 'mobile' || changeType === 'email') {
        // Validate OTP and new mobile/email
        if (!otp || !mobile || !email) {
          setError('OTP, Mobile, and Email are required');
          return;
        }

        const response = await axios.post(
          `http://103.35.121.219:4000/corp/dashboard/change${changeType.charAt(0).toUpperCase() + changeType.slice(1)}`,
          {
            corp_id,
            otp,
            mobile,
            email,
          },
          {
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual Bearer token
            },
          }
        );
        if (response.data.code === 1000) {
          setMessage(`${changeType.charAt(0).toUpperCase() + changeType.slice(1)} changed successfully!`);
        } else {
          setError(`Failed to change ${changeType}`);
        }
      } else if (changeType === 'userId') {
        // Validate userId
        if (!userId) {
          setError('User ID is required');
          return;
        }

        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/changeUserId',
          {
            corp_id,
            user_id: userId,
          },
          {
            headers: {
              Authorization: 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual Bearer token
            },
          }
        );
        if (response.data.code === 1000) {
          setMessage('User ID changed successfully!');
        } else {
          setError('Failed to change User ID');
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while changing details');
    }
  };

  return (
    <div>
      <h4>Change Details for Corp ID: {corp_id}</h4>

      {/* Display success or error messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Select change type */}
      <div className="form-group">
        <label htmlFor="changeType">Choose detail to change:</label>
        <select
          id="changeType"
          className="form-control"
          value={changeType}
          onChange={(e) => setChangeType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="password">Password</option>
          <option value="mobile">Mobile</option>
          <option value="email">Email</option>
          <option value="userId">User ID</option>
        </select>
      </div>

      {/* Show corresponding form based on change type */}
      {changeType === 'password' && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Change Password
          </button>
        </form>
      )}

      {changeType === 'mobile' && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mobile">New Mobile Number</label>
            <input
              type="text"
              id="mobile"
              className="form-control"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Change Mobile Number
          </button>
        </form>
      )}

      {changeType === 'email' && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">New Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Change Email
          </button>
        </form>
      )}

      {changeType === 'userId' && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">New User ID</label>
            <input
              type="text"
              id="userId"
              className="form-control"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Change User ID
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePass;
