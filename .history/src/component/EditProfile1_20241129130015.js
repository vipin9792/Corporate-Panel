import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee
} from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    userid: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the profile data using corp_id
  useEffect(() => {
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchProfile', {
        corp_id: corp_id,
      }, {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          const { company_name, email, phone_no, address, username } = response.data.profile;
          setProfile(response.data.profile); // Set profile data
          setFormData({
            company_name,
            email,
            phone: phone_no,
            address,
            userid: username,
          });
        } else {
          setError('Failed to fetch profile data');
        }
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log data to verify
    console.log('Submitting data:', formData);

    try {
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/updateProfile',
        {
          corp_id: corp_id,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          userid: formData.userid, 
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        alert('Profile updated successfully!');
        navigate(`/ViewProfile/${corp_id}`);
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An error occurred while saving changes');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {profile ? (
        <div className="d-flex flex-column min-vh-100 position-relative">
          <div className="layout-wrapper layout-content-navbar flex-grow-1">
            <div className="layout-container" style={{ position: "relative" }}>
              {/* Sidebar and Navigation */}
              <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: "100vh", zIndex: 1 }}>
                {/* Sidebar Content */}
                {/* Similar to the original sidebar and menu */}
              </aside>

              <div className="layout-page bg-white">
                <div className="container h-15vh">
                  <div className="row mt-3 align-items-center">
                    <div className="col-lg-8">
                      <h4 className="fw-bold text-primary">Dashboard/Corporate Profile</h4>
                    </div>
                    <div className="col-lg-4">
                      <div className="row justify-content-end">
                        <div className="col-lg-6">
                          <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                            <img
                              src="../d-user.svg"
                              alt="d-user"
                              className="img-fluid"
                              width="50px"
                            />
                            <h6 className="ms-2 mb-0 ">
                              <span className="text-primary lh-1">Welcome</span>{" "}
                              <br /> User TP
                              <a href="">
                                <FontAwesomeIcon
                                  icon={faSignOutAlt}
                                  style={{
                                    color: "grey",
                                    position: "relative",
                                    left: "25%",
                                    marginBottom: "8px",
                                    width: "35px",
                                    height: "15px",
                                  }}
                                />
                              </a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container mt-1">
                  <div className="row">
                    <div className="container-fluid h-85vh">
                      <div className="content-wrapper h-100">
                        <div className="position-relative h-100 skyblue rounded p-3 mt-3">
                          <div className="hackthonProfile overflow-auto pe-2 h-100">
                            <div className="bg-white">
                              <div className="row m-1">
                                <div className="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                                  <div className="w-max">
                                    <div className="userEditWrapper">
                                      {/* Logo */}
                                      <img
                                        src="https://admincp.pareekshn.in/cpareekshn/upload/orglogo/2022-1-12-T-15-4-36-793000000-2117/pareekshn_logo.jpg"
                                        alt="Company Logo"
                                        style={{ width: '200px', height: '80px', objectFit: 'cover', borderRadius:"12px" }}
                                      />

                                      <div className="userEditForm">
                                        {/* Edit Profile Button */}
                                        <Link to={`/EditProfile1/${corp_id}`} className="btn btn-primary m-0 rounded-pill text-white">
                                          <img src="../edit.svg" alt="edit" /> Edit
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <form onSubmit={handleSubmit}>
                                <div className="row mt-4 m-1">
                                  <div className="col-lg-10">
                                    <div className="row">
                                      <div className="col-lg-6 mb-3">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                            disabled
                                          />
                                          <label>Corporate Name</label>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 mb-3">
                                        <div className="form-floating">
                                          <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                          />
                                          <label>Email</label>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 mb-3">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                          />
                                          <label>Phone</label>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 mb-3">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                          />
                                          <label>Address</label>
                                        </div>
                                      </div>

                                      <div className="col-lg-6 mb-3">
                                        <div className="form-floating">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={formData.userid}
                                            onChange={(e) => setFormData({ ...formData, userid: e.target.value })}
                                          />
                                          <label>Username</label>
                                        </div>
                                      </div>

                                      <div className="col-lg-12 mb-3">
                                        <button type="submit" className="btn btn-primary rounded-pill text-white">Save</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
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
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default Edit;
