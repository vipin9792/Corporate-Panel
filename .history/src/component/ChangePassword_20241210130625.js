import React, { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    // API call logic can be added here
    setMessage('Password changed successfully!');
    setError('');
  };

  // Toggle visibility of old password
  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  // Toggle visibility of new password
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  // Toggle visibility of confirm password
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="container">
      <h4>Change Your Password</h4>

      {/* Display success or error messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Password Change Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <div className="input-group">
            <input
              type={oldPasswordVisible ? 'text' : 'password'}
              id="oldPassword"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleOldPasswordVisibility}
              >
                <img
                  src={oldPasswordVisible ? 'eye.png' : 'eye.png'}
                  alt="Toggle Visibility"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="newPassword">New Password</label>
          <div className="input-group">
            <input
              type={newPasswordVisible ? 'text' : 'password'}
              id="newPassword"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleNewPasswordVisibility}
              >
                <img
                src={oldPasswordVisible ? 'eye.png' : 'eye.png'}
                  alt="Toggle Visibility"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="input-group">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                 src={oldPasswordVisible ? '../eye.png' : '../eye.png'}
                  alt="Toggle Visibility"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
