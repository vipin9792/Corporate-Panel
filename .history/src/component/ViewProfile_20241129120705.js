import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee
} from "@fortawesome/free-solid-svg-icons";

const ViewProfile1 = () => {
  const { corp_id } = useParams(); // Access corp_id from the URL params
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Your Bearer Token

  useEffect(() => {
    // Get corp_id from localStorage if not available in URL
    const actualCorpId = corp_id || localStorage.getItem('corp_id');
    if (!actualCorpId) {
      setError("No company ID found. Please log in again.");
      alert("No company ID found. Please log in again.");
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
          { corp_id: actualCorpId },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`, // Use the provided Bearer token here
            },
          }
        );

        if (response.data.code === 1000) {
          setProfileData(response.data.profile);
        } else {
          setError("Error fetching profile data.");
          alert("Error fetching profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Error fetching profile data");
        alert("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corp_id]);

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
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-primary"
            style={{ height: "100vh", zIndex: 1 }}
          >
            <div className="app-brand demo" style={{ background: "#1C4481" }}>
              <a href="index.html" className="app-brand-link">
                <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
              </a>
              <Link to="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                <i className="bx bx-chevron-left bx-sm align-middle"></i>
              </Link>
            </div>
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
              <li className="menu-item active">
                <Link to="/dashboard" className="menu-link text-decoration-none">
                  <img src="dashboard-active.svg" alt="" className="menu-icon tf-icons bx bx-home-circle" />
                  <div data-i18n="Analytics">Dashboard</div>
                </Link>
              </li>
              <br />
              <li>
                <Link
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseProfile"
                  aria-expanded="false"
                  aria-controls="collapseProfile"
                  className="d-flex cursor-pointer text-decoration-none"
                >
                  <FontAwesomeIcon icon={faUserCircle} size="2x" className="mx-2" style={{ color: "white" }} />
                  <span className="text-white mt-1">Profile <img src="down-arrow.png" alt="" width="30px" height="20px" /></span>
                </Link>
                <div className="collapse" id="collapseProfile">
                  <ul>
                    <li className="menu-item mt-2">
                      <Link to="/ViewProfile" className="text-white text-decoration-none">
                        <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                      </Link>
                    </li>
                    <li className="menu-item my-2">
                      <a href="#tr" className="text-white text-decoration-none">
                        <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo Update
                      </a>
                    </li>
                    <br />
                  </ul>
                </div>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link text-decoration-none">
                  <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} />
                  <span className="mx-2 text-white"> Plan</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="menu-link mx-3 text-decoration-none">
                  <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: "white" }} />
                  <span className="mx-2 text-white">Logout</span>
                </Link>
              </li>
            </ul>
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
                        <img src="d-user.svg" alt="d-user" className="img-fluid" width="50px" />
                        <h6 className="ms-2 mb-0">
                          <span className="text-primary lh-1">Welcome</span> <br /> User TP
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
                                  <img
                                    src={profileData ? profileData.logo : "default_logo.jpg"}
                                    alt="Company Logo"
                                    style={{ width: "200px", height: "80px", objectFit: "cover", borderRadius: "12px" }}
                                  />
                                  <div className="userEditForm">
                                    <form action="#" id="editUserPicForm">
                                      <input type="file" className="d-none" id="editUserPic" />
                                      <label for="editUserPic">
                                        <img src="edit-user.svg" alt="userEditForm" width="25" />
                                      </label>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <h4>
                                  {profileData ? profileData.company_name : "Loading..."}
                                </h4>
                                <p>{profileData ? profileData.email : "Loading..."}</p>
                              </div>
                            </div>
                          </div>

                          {/* Display other profile details */}
                          <div className="row">
                            <div className="col-md-12 mt-3">
                              <h5>Profile Information</h5>
                              <div className="profile-info">
                                <p>Company Name: {profileData ? profileData.company_name : "Loading..."}</p>
                                <p>Contact: {profileData ? profileData.contact : "Loading..."}</p>
                                <p>Email: {profileData ? profileData.email : "Loading..."}</p>
                                {/* Add other details as required */}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProfile1;
