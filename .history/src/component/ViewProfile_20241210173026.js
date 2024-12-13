import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const ViewProfile = () => {
  const { corp_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logo, setLogo] = useState(null); // State to hold selected logo file
  const [logoMessage, setLogoMessage] = useState(""); // Message for logo update status

  useEffect(() => {
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        {
          corp_id: corp_id,
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      console.log("Selected logo file:", file);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const updateLogo = async () => {
    if (!logo) {
      setLogoMessage("Please select a logo to upload.");
      alert("Please select a logo to upload.");
      return;
    }

    try {
      const base64Image = await convertToBase64(logo);
      console.log("Base64 image data:", base64Image);

      const response = await axios.post(
        "http://103.35.121.219:4000/corp/dashboard/updateLogo",
        {
          corp_id: corp_id,
          file: base64Image,
        },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      if (response.data.code === 1000) {
        setLogoMessage("Logo updated successfully!");
        alert("Logo updated successfully!");
        setProfile((prevProfile) => ({
          ...prevProfile,
          logo: response.data.newLogoUrl, // Assuming the response contains the new logo URL
        }));
      } else {
        setLogoMessage("Failed to update logo");
        alert("Failed to update logo");
      }
    } catch (error) {
      console.error("Error updating logo:", error);
      setLogoMessage("An error occurred while updating the logo");
      alert("An error occurred while updating the logo");
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
              <aside
                id="layout-menu"
                className="layout-menu menu-vertical menu bg-primary"
                style={{ height: "100vh", zIndex: 1 }}
              >
                {/* Sidebar content */}
                {/* ... (unchanged code for sidebar) ... */}
              </aside>

              <div className="layout-page bg-white">
                <div className="container h-15vh">
                  <div className="row mt-3 align-items-center">
                    <div className="col-lg-8">
                      <h4 className="fw-bold text-primary">
                        Dashboard/Corporate Profile
                      </h4>
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
                            <div className=" bg-white">
                              <div className="row m-1">
                                <div className="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                                  <div className="w-max">
                                    <div className="userEditWrapper">
                                      <img
                                        src={profile.logo || "https://via.placeholder.com/200x80"}
                                        alt="Company Logo"
                                        style={{
                                          width: "200px",
                                          height: "80px",
                                          objectFit: "cover",
                                          borderRadius: "12px",
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="userEditForm">
                                    <form action="#" id="editUserPicForm">
                                      <input
                                        type="file"
                                        className="d-none"
                                        id="editUserPic"
                                        onChange={handleLogoChange}
                                      />
                                      <label for="editUserPic">
                                        <img
                                          src="../edit-user.svg"
                                          alt="userEditForm"
                                          width="25"
                                          style={{ marginRight: "784px", marginTop: "-724px" }}
                                        />
                                      </label>
                                    </form>
                                  </div>

                                  <button
                                    className="btn btn-primary m-0 rounded-pill text-white"
                                    onClick={updateLogo}
                                  >
                                    Update Logo
                                  </button>
                                </div>
                              </div>

                              {/* Profile Form Content */}
                              {/* ... (unchanged profile form code) ... */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
          <br />
          <br />
          <br />
          <Footer />
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
