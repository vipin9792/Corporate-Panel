import React, { useState } from 'react';

const ChangeDetails = () => {
  const [changeType, setChangeType] = useState(''); // To track the selected change type
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (changeType === 'password') {
      // Validate password fields
      if (!oldPassword || !newPassword) {
        setError('Both Old Password and New Password are required');
        return;
      }

      // API call logic can be added here
      setMessage('Password changed successfully!');
      setError('');
    } else {
      setError('Please select a detail to change.');
    }
  };

  // Toggle visibility of old password
  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  // Toggle visibility of new password
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  return (
    <div className="container">
      <h4>Change Details</h4>

      {/* Display success or error messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Choose detail to change */}
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
        </select>
      </div>

      {/* Show Password Change Form if "Password" is selected */}
      {changeType === 'password' && (
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
                  <i className={oldPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
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
                  <i className={newPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Change Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangeDetails;
