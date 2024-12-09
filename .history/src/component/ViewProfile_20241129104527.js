import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewProfile = () => {
  const { corp_id } = useParams(); // Access the corp_id parameter
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the profile data using corp_id
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
        corp_id: corp_id, // Use corp_id directly
      }, {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
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
  }, [corp_id]); // Trigger the effect when corp_id changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <form>
            <div>
              <label>Company Name:</label>
              <input type="text" value={profile.company_name} disabled />
            </div>

            <div>
              <label>Email:</label>
              <input type="email" value={profile.email} disabled />
            </div>

            <div>
              <label>Phone:</label>
              <input type="text" value={profile.phone_no} disabled />
            </div>

            <div>
              <label>Address:</label>
              <input type="text" value={profile.address} disabled />
            </div>



            

            <div>
              <label>Logo:</label>
              <img src={profile.logo} alt="Profile Logo" style={{ maxWidth: '100px', height: 'auto' }} />
            </div>

            <div>
              <label>Storage Used:</label>
              <input type="text" value={`${profile.storage_used} MB`} disabled />
            </div>
          </form>

          {/* Edit Button */}
          <Link to={`/EditProfile1/${corp_id}`} className="btn btn-primary">
            Edit Profile
          </Link>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
