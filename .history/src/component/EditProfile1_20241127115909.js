import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../FormContext'; // To access global form context

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState({
    companyName: '',
    emailId: '',
    phoneNo: '',
    address: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { formData } = useForm(); // Access the form data (including corp_id)

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Fetch current profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
              'Corp-Id': formData.corpId, // Use the corpId from context
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data); // Set the profile data
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [formData.corpId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            'Corp-Id': formData.corpId,
          },
        }
      );

      if (response.status === 200) {
        alert('Profile updated successfully');
        navigate('/profile'); // Redirect to profile page
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={profileData.companyName}
            onChange={(e) =>
              setProfileData({ ...profileData, companyName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={profileData.emailId}
            onChange={(e) =>
              setProfileData({ ...profileData, emailId: e.target.value })
            }
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={profileData.phoneNo}
            onChange={(e) =>
              setProfileData({ ...profileData, phoneNo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={profileData.address}
            onChange={(e) =>
              setProfileData({ ...profileData, address: e.target.value })
            }
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile1;
