import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile1 = () => {
  const { corp_id } = useParams(); // Get the corp_id from the URL
  const navigate = useNavigate(); // To navigate back to the view profile page
  const [profile, setProfile] = useState(null); // To store the current profile data
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(''); // To store any error message
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    userid: '',
  });

  // Fetch the profile data when the component mounts
  useEffect(() => {
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
            phone: response.data.profile.phone_no,
            address: response.data.profile.address,
            userid: response.data.profile.userid, // Ensure this is included
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

  // Handle changes to the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated profile data to the update API
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        {
          corp_id: corp_id,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          userid: formData.userid, // Ensure the userid is included in the request
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        navigate(`/ViewProfile/${corp_id}`); // Redirect to the ViewProfile page after successful update
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred while saving changes');
    }
  };

  // Show loading, error, or the form based on the state
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
            <label>User ID:</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              onChange={handleChange} // Ensure that changes to 'userid' are tracked
              required
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
