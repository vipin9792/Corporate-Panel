import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../FormContext'; // To access global form context (to get the corp_id)

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { formData } = useForm(); // Access the form data (including corp_id)
  const navigate = useNavigate();

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
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
  }, [formData.corpId]); // Trigger the effect when corpId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      <div>
        <p><strong>Company Name:</strong> {profileData.companyName}</p>
        <p><strong>Email:</strong> {profileData.emailId}</p>
        <p><strong>Phone Number:</strong> {profileData.phoneNo}</p>
        <p><strong>Address:</strong> {profileData.address}</p>
        <p><strong>Full Name:</strong> {profileData.name}</p>
        <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
