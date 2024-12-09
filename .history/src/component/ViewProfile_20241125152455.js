import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // To toggle between view and edit modes
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone_no: '',
    address: '',
    username: '',
    password: ''
  });

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  useEffect(() => {
    // Fetch the corp_id from the API and then fetch profile data
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Fetch profile data from the API
        const response = await axios.post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {}, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });

        if (response.data.code === 1000) {
          const profile = response.data.profile;
          setProfileData(profile);
          setFormData({
            company_name: profile.company_name,
            email: profile.email,
            phone_no: profile.phone_no,
            address: profile.address,
            username: profile.username,
            password: profile.password,
          });
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

    fetchProfileData(); // Call the function to fetch the profile data when the component mounts
  }, []); // Empty dependency array to run once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Update profile data
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        { corp_id: profileData.corp_id, ...formData },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.data.code === 1000) {
        setProfileData({ ...formData });
        setEditMode(false);
        alert('Profile updated successfully!');
      } else {
        alert('Error saving profile data.');
      }
    } catch (err) {
      console.error('Error saving profile data:', err);
      alert('Error saving profile data.');
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
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        <div className="layout-container" style={{ position: "relative" }}>
          <div className="layout-page bg-white">
            <div className="container mt-1">
              <div className="row">
                <div className="col-lg-12">
                  <div className="userEditWrapper">
                    <div>
                      <img
                        src={profileData?.logo || "default_logo.jpg"}
                        alt="Company Logo"
                        style={{ width: '200px', height: '80px', objectFit: 'cover', borderRadius: "12px" }}
                      />
                    </div>

                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="btn btn-primary m-2 rounded-pill text-white"
                    >
                      <FontAwesomeIcon icon={faUserEdit} />
                      {editMode ? 'Cancel' : 'Edit'}
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn btn-success m-2 rounded-pill text-white"
                      disabled={!editMode || loading}
                    >
                      Save
                    </button>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        name="phone_no"
                        value={formData.phone_no}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        readOnly={!editMode}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProfile;
