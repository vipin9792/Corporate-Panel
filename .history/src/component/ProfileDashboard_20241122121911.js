import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
          headers: {
            Authorization: ' !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Assuming the API response has a 'profile' object
        } else {
          setError('Failed to fetch profile data');
          console.error("API Response Error:", response.data); // Log the error response
        }
      } catch (err) {
        setError('Error fetching data');
        console.error("API Fetch Error:", err); // Log the full error object
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
    <>
      <div className="col-lg-6 bg-white p-4" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {/* Profile Header */}
        <h4>Profile Details</h4>

        {/* Profile Picture */}
        <div className="text-center">
          <img
            src={profileData?.profile_picture || 'default-avatar.jpg'} // Assuming the profile picture field
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>

        {/* Profile Information */}
        <div className="mt-4">
          <h5>{profileData?.name || 'Name not available'}</h5>
          <p><strong>Role: </strong>{profileData?.role || 'Role not available'}</p>
          <p><strong>Email: </strong>{profileData?.email || 'Email not available'}</p>
          <p><strong>Phone: </strong>{profileData?.phone || 'Phone not available'}</p>
        </div>

        {/* Profile Bio or Description */}
        <div className="mt-4">
          <h6>About Me</h6>
          <p>{profileData?.bio || 'No bio available'}</p>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 d-flex justify-content-between">
          {profileData?.social_media?.facebook && (
            <a href={profileData.social_media.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Facebook
            </a>
          )}
          {profileData?.social_media?.twitter && (
            <a href={profileData.social_media.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm">
              Twitter
            </a>
          )}
          {profileData?.social_media?.linkedin && (
            <a href={profileData.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
