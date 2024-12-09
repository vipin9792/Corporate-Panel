import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    phone_no: '',
    company_name: '',
    username: '',
    password: '',
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch profile data from localStorage
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      setProfileData(profile);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulating an API call to update profile
      // Replace this with the actual API call logic (e.g., Axios)
      const updatedProfileData = {
        ...profileData,
      };

      // Mock API success (simulated)
      setTimeout(() => {
        localStorage.setItem('profile', JSON.stringify(updatedProfileData));
        setProfileData(updatedProfileData);
        setSuccessMessage('Profile updated successfully!');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to update profile!');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={profileData.name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={profileData.email || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_no" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone_no"
            name="phone_no"
            value={profileData.phone_no || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="company_name" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="company_name"
            name="company_name"
            value={profileData.company_name || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={profileData.username || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={profileData.password || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="logo" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
