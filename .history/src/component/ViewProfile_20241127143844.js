import React, { useEffect, useState } from 'react';
import { useForm } from '../FormContext'; // To access global form context
import axios from 'axios';

const ViewProfile = () => {
  const { formData } = useForm(); // Get the formData from context
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${formData.corpId}`,
          {
            headers: {
              Authorization: `Bearer YOUR_BEARER_TOKEN`,
            },
          }
        );
        
        if (response.status === 200 && response.data.profile) {
          setProfile(response.data.profile);
        } else {
          const errorMessage = "Failed to load profile.";
          setError(errorMessage);
          alert(errorMessage);  // Show an alert if there's an issue with fetching the profile
        }
      } catch (error) {
        const errorMessage = 'Error fetching profile: ' + (error.response?.data?.message || error.message);
        setError(errorMessage);
        alert(errorMessage);  // Show an alert with the error message
      } finally {
        setLoading(false);
      }
    };

    if (formData.corpId) {
      fetchProfile();
    } else {
      const errorMessage = "No corp_id found.";
      setError(errorMessage);
      alert(errorMessage);  // Alert if no corp_id exists
    }
  }, [formData.corpId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      {profile ? (
        <div>
          <p><strong>Company Name:</strong> {profile.company_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone_no}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Full Name:</strong> {profile.name}</p>
          <img src={profile.logo} alt="Company Logo" />
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default ViewProfile;
