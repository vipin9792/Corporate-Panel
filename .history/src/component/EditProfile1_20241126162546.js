import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState({
    company_name: '',
    email: '',
    phone_no: '',
    address: '',
    username: '',
    password: '',
  });
  const [newLogo, setNewLogo] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token
  const corpId = localStorage.getItem('corp_id'); // Get corp_id from localStorage

  useEffect(() => {
    if (!corpId) {
      setError('No company ID found. Please log in again.');
      navigate('/login');
      return;
    }

    // Fetch profile data to pre-fill the form
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError('Error fetching profile data.');
        }
      } catch (err) {
        setError('Error fetching profile data');
        console.error('Error:', err);
      }
    };

    fetchProfileData();
  }, [corpId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    setNewLogo(e.target.files[0]);
  };

  const saveProfile = async () => {
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('corp_id', corpId);
    formData.append('company_name', profileData.company_name);
    formData.append('email', profileData.email);
    formData.append('phone_no', profileData.phone_no);
    formData.append('address', profileData.address);
    formData.append('username', profileData.username);
    formData.append('password', profileData.password);

    // Append logo if new one is selected
    if (newLogo) {
      formData.append('logo', newLogo);
    }

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        navigate('/viewProfile'); // Navigate to view profile page after update
      } else {
        setError('Error updating profile!');
        console.error('Error response:', response.data); // Log full error response for debugging
      }
    } catch (err) {
      setError('Error updating profile!');
      console.error('Error during profile update request:', err); // Log full error for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4>Edit Profile</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {isSubmitting && <div>Saving...</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Corporate Name</label>
          <input
            type="text"
            name="company_name"
            value={profileData.company_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_no"
            value={profileData.phone_no}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Change Logo</label>
          <input type="file" onChange={handleLogoChange} />
        </div>

        <div>
          <button type="button" onClick={saveProfile} disabled={isSubmitting}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile1;
