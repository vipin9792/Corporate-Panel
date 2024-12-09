import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../FormContext'; // Access the global form context to get corpId

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { formData } = useForm(); // Access the form data (including corpId)
  const navigate = useNavigate();

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      console.log("Fetching profile for Corp ID:", formData.corpId); // Log the corpId to verify it's correct

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          {}, // No body data, we only need headers
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
              'Corp-Id': formData.corpId, // Use the corpId from context
            },
          }
        );

        console.log("API Response:", response.data); // Log the full response

        if (response.status === 200 && response.data.code === 1000) {
          setProfileData(response.data.profile); // Set the profile data
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        console.error("Error fetching profile data:", err); // Log the error for debugging
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (formData.corpId) {
      fetchProfileData(); // Only fetch if corpId is available
    }
  }, [formData.corpId]); // Re-run when corpId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Profile</h2>
      {profileData ? (
        <div>
          <p><strong>Company Name:</strong> {profileData.company_name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Phone Number:</strong> {profileData.phone_no}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Full Name:</strong> {profileData.name}</p>
          <p><strong>Logo:</strong> <img src={profileData.logo} alt="Company Logo" width="100" /></p>
          <button onClick={() => navigate('/EditProfile1')}>Edit Profile</button>
        </div>
      ) : (
        <div>No profile data found</div>
      )}
    </div>
  );
};

export default ViewProfile;
