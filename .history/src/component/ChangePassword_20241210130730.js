import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
  const { corp_id } = useParams(); // Get `corp_id` from URL params
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!oldPassword || !newPassword) {
      setError('Both fields are required');
      return;
    }

    try {
      // Send the API request to change the password
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/changePassword',
        {
          corp_id,
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz', // Replace with your actual Bearer token
          },
        }
      );

      // Check if the response is successful
      if (response.data.code === 1000) {
        setMessage('Password changed successfully!');
      } else {
        setError('Failed to change password');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError('An error occurred while changing the password');
    }
  };

  return (
    <div>
      <h4>Change Password for Corp ID: {corp_id}</h4>

      {/* Display success or error messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Password Change Form */}
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
    </div>
  );
};

export default ChangePassword;
