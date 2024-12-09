import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
  const { corp_id } = useParams(); // Access the corp_id parameter from URL
  const navigate = useNavigate(); // To navigate after form submission
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    userid: '',  // For username
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch the current profile data when the component mounts
    axios
      .post(
        'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
        { corp_id },
        {
          headers: {
            Authorization: `Bearer <your_token>`, // Replace with your actual token
          },
        }
      )
      .then((response) => {
        console.log('Profile Fetch Response:', response); // Log the response for debugging
        if (response.data.code === 1000) {
          const { company_name, email, phone_no, address, username } = response.data.profile;
          setFormData({
            company_name,
            email,
            phone: phone_no,
            address,
            userid: username,
          });
        } else {
          setError('Failed to fetch profile data');
        }
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated data to the API
    axios
      .post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        {
          corp_id,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          userid: formData.userid,
        },
        {
          headers: {
            Authorization: `Bearer <your_token>`, // Replace with your actual token
          },
        }
      )
      .then((response) => {
        console.log('Update Response:', response); // Log the response for debugging
        if (response.data.code === 1000) {
          setSuccess('Profile updated successfully!');
          navigate(`/ViewProfile/${corp_id}`); // Redirect to view profile after update
        } else {
          setError('Failed to update profile');
        }
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        setError('Error updating profile');
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Profile</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
