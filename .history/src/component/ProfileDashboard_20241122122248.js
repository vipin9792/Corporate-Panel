import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });

const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';


        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Save profile data to state
        } else {
          setError('Failed to fetch profile data');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error('API Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run once on mount

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return (
      <div>
        {error}
        <br />
        <small>Check console for more details.</small>
      </div>
    );
  }

  return (
    <div className="profile-dashboard container">
      {/* Profile Card */}
      <div className="card" style={{ width: '18rem', margin: '20px auto', padding: '20px', borderRadius: '10px' }}>
        {/* Profile Logo */}
        <div className="text-center">
          <img
            src={profileData?.logo || 'default-logo.png'}
            alt="Company Logo"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        
        {/* Profile Information */}
        <div className="card-body text-center">
          <h5 className="card-title">{profileData?.company_name}</h5>
          <p className="card-text"><strong>Name: </strong>{profileData?.name}</p>
          <p className="card-text"><strong>Email: </strong>{profileData?.email}</p>
          <p className="card-text"><strong>Phone: </strong>{profileData?.phone_no}</p>
          <p className="card-text"><strong>Address: </strong>{profileData?.address}</p>
          <p className="card-text"><strong>Storage Used: </strong>{profileData?.storage_used} MB</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
