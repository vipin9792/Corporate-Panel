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
  const [image, setImage] = useState(null); // Track the uploaded image
  const [imageUrl, setImageUrl] = useState(""); // Store image URL after successful upload

  useEffect(() => {
    // Fetch Profile Data
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your actual token
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

  // Handle Image Upload
  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file); // Append the image file
    formData.append("corp_id", corp_id); // Append corp_id to associate with profile

    // Logging FormData for debugging
    console.log("Uploading image with FormData:", formData);

    axios
      .post("http://103.35.121.219:4000/corp/uploadImage", formData, {
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`, // Replace with your actual token
          "Content-Type": "multipart/form-data", // Ensure the request is sent as multipart
        },
      })
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        if (response.data.code === 1000) {
          setImageUrl(response.data.imageUrl); // Store the uploaded image URL
        } else {
          setError("Error uploading image: " + response.data.message || "Unknown error");
        }
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
        setError("Error uploading image: " + (err.response?.data?.message || err.message));
      });
  };

  // Handle image change (when user selects a new image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update the image state with the selected file
      uploadImage(file); // Call the upload function
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
                {/* Menu items */}
              </aside>

              <div className="layout-page bg-white">
                <div className="container h-15vh">
                  <div className="row mt-3 align-items-center">
                    <div className="col-lg-8">
                      <h4 className="fw-bold text-primary">
                        Dashborad/Corporate Profile
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
                    <div className="container-fluid  h-85vh">
                      <div className="content-wrapper h-100">
                        <div className="position-relative h-100 skyblue rounded p-3 mt-3">
                          <div className="hackthonProfile overflow-auto pe-2 h-100">
                            <div className="bg-white">
                              <div className="row m-1">
                                <div className="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                                  <div className="w-max">
                                    <div className="userEditWrapper">
                                      {/* Display Logo */}
                                      <img
                                        src={imageUrl || profile.logo}
                                        alt="Company Logo"
                                        style={{
                                          width: "200px",
                                          height: "80px",
                                          objectFit: "cover",
                                          borderRadius: "12px",
                                        }}
                                      />
                                      {/* Logo Update Section */}
                                      <div className="userEditForm">
                                        <form action="#" id="editUserPicForm">
                                          <input
                                            type="file"
                                            className="d-none"
                                            id="editUserPic"
                                            onChange={handleImageChange}
                                          />
                                          <label htmlFor="editUserPic">
                                            <img
                                              src="../edit-user.svg"
                                              alt="userEditForm"
                                              width="25"
                                              style={{ marginRight: "784px", marginTop: "-724px" }}
                                            />
                                          </label>
                                        </form>
                                      </div>
                                    </div>
                                  </div>

                                  <Link
                                    to={`/EditProfile1/${corp_id}`}
                                    className="btn btn-primary m-0 rounded-pill text-white"
                                  >
                                    <img src="../edit.svg" alt="edit" /> Edit
                                  </Link>
                                </div>
                              </div>
                              {/* Form for profile data */}
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
