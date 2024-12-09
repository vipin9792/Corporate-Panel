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
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile', // Correct API endpoint
          {},
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        console.log('API Response:', response.data); // Log the response

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
          setFormData({
            company_name: response.data.profile.company_name,
            email: response.data.profile.email,
            phone_no: response.data.profile.phone_no,
            address: response.data.profile.address,
            username: response.data.profile.username,
            password: response.data.profile.password,
          });
        } else {
          setError('Error fetching profile data: ' + response.data.status);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data.');
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchProfileData(); // Fetch the profile when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Ensure the corp_id is passed correctly
      const corpId = profileData?.id; // Use the corp_id from the fetched profile data
      if (!corpId) {
        setError('Corp ID not found');
        return;
      }

      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
        { corp_id: corpId, ...formData },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      console.log('Save Response:', response.data); // Log the response

      if (response.data.code === 1000) {
        setProfileData({ ...formData });
        setEditMode(false); // Switch back to view mode
      } else {
        alert('Error saving profile data: ' + response.data.status);
      }
    } catch (err) {
      console.error('Error saving profile data:', err);
      alert('Error saving profile data.');
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
          {/* Sidebar and other layout components here */}

          <div className="layout-page bg-white">
            <div className="container mt-1">
              <div className="row">
                <div className="col-lg-12">
                  <div className="userEditWrapper">
                    <div>
                      <img
                        src={profileData?.logo || "default_logo.jpg"} // Display default if no logo
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
                      disabled={!editMode}
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