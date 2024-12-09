import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile1 = () => {
  const { corp_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    userid: '',  // This should correspond to the username
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the profile data using corp_id
    axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', { corp_id }, {
      headers: {
        Authorization: `Bearer <your_token>`,
      },
    })
    .then((response) => {
      if (response.data.code === 1000) {
        const { company_name, email, phone_no, address, username } = response.data.profile;
        setFormData({
          company_name,
          email,
          phone: phone_no, // Ensure phone_no is set correctly
          address,
          userid: username, // Set username correctly
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting data:', formData);

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        {
          corp_id: corp_id,
          company_name: formData.company_name,
          email: formData.email,
          phone_no: formData.phone, // Ensure phone_no is sent
          address: formData.address,
          userid: formData.userid, // Ensure correct field for username
        },
        {
          headers: {
            Authorization: `Bearer <your_token>`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        navigate(`/ViewProfile/${corp_id}`);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred while saving changes');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.userid}  // This is the "username" field
            onChange={(e) => setFormData({ ...formData, userid: e.target.value })}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile1;
