import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To navigate after updating profile

const EditProfile1 = () => {
  const [profileData, setProfileData] = useState({
    company_name: "",
    email: "",
    phone_no: "",
    address: "",
    username: "",
    password: "",
    logo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate back after update
  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  useEffect(() => {
    const corpId = localStorage.getItem('corp_id');

    if (!corpId) {
      setError('No company ID found. Please log in again.');
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile); // Populate form fields
        } else {
          setError('Error fetching profile data.');
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const corpId = localStorage.getItem('corp_id');

    if (!corpId) {
      setError('No company ID found. Please log in again.');
      return;
    }

    try {
      const response = await axios.put(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        { corp_id: corpId, ...profileData },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        navigate('/ViewProfile'); // Navigate back to the profile view after update
      } else {
        alert('Error updating profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h4 className="fw-bold text-primary">Edit Corporate Profile</h4>
      <form onSubmit={handleUpdate}>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="company_name"
                value={profileData.company_name}
                onChange={handleInputChange}
                required
              />
              <label>Corporate Name</label>
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                required
              />
              <label>Email</label>
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="phone_no"
                value={profileData.phone_no}
                onChange={handleInputChange}
                required
              />
              <label>Corporate Mobile Number</label>
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                required
              />
              <label>Corporate Location</label>
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                readOnly
              />
              <label>Corporate User ID</label>
            </div>
          </div>

          <div className="col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                readOnly
                required
              />
              <label>Password</label>
            </div>
          </div>

          <div className="col-lg-12 mb-3">
            <button type="submit" className="btn btn-primary w-100 rounded-pill text-white">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile1;
