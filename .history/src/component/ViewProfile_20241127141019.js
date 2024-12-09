import React, { useEffect, useState } from 'react';
import { useForm } from "./component/FormContext";
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
          setError("Failed to load profile.");
        }
      } catch (error) {
        setError('Error fetching profile: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (formData.corpId) {
      fetchProfile();
    }
  }, [formData.corpId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      {profile && (
        <div>
          <p><strong>Company Name:</strong> {profile.company_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone_no}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Full Name:</strong> {profile.name}</p>
          <img src={profile.logo} alt="Company Logo" />
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
