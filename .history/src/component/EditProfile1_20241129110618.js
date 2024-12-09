import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile1 = () => {
  const { corp_id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone_no: '',
    address: '',
    logo: '',
  });

  useEffect(() => {
    // Fetch the profile data using corp_id
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
        corp_id: corp_id,
      }, {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
          setFormData({
            company_name: response.data.profile.company_name,
            email: response.data.profile.email,
            phone_no: response.data.profile.phone_no,
            address: response.data.profile.address,
            logo: response.data.profile.logo,
          });
        } else {
          setError('Profile data not found');
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile', // Assuming the API endpoint for updating profile
        { corp_id, ...formData },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        navigate(`/ViewProfile/${corp_id}`); // Redirect to the view profile page
      } else {
        setError('Error updating profile');
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
      {profile ? (
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
              name="phone_no"
              value={formData.phone_no}
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
            <label>usern:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
         


          <div>
            <label>Logo:</label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>No profile data available to edit</p>
      )}
    </div>
  );
};

export default EditProfile1;
