import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const { corp_id } = useParams(); // Get corp_id from URL
  const [profile, setProfile] = useState(null); // Profile state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [imageUrl, setImageUrl] = useState(null); // State for uploaded image URL
  const [file, setFile] = useState(null); // File state for the image to be uploaded

  useEffect(() => {
    // Fetch profile data from API
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz


`, // Replace with your actual token
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile); // Set profile data
        } else {
          setError("Profile data not found");
        }
      })
      .catch((err) => {
        setError("Error fetching profile data");
        console.error("Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [corp_id]);

  // Handle image file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  // Upload image to the server
  const uploadImage = () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Append the image file
    formData.append("corp_id", corp_id); // Append corp_id to associate with the profile

    console.log("Uploading image...");
    console.log(formData); // Log form data to ensure it's being sent properly

    axios
      .post("http://103.35.121.219:4000/corp/uploadImage", formData, {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz


`, // Replace with your actual token
          "Content-Type": "multipart/form-data", // Ensure the request is sent as multipart
        },
      })
      .then((response) => {
        console.log(response); // Log the response for debugging
        if (response.data.code === 1000) {
          setImageUrl(response.data.imageUrl); // Save the uploaded image URL
          setError(""); // Clear any previous error messages
        } else {
          setError(response.data.message || "Error uploading image.");
        }
      })
      .catch((err) => {
        setError("Error uploading image: " + (err.response?.data?.message || err.message));
        console.error("Error uploading image:", err); // Log the full error for debugging
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {profile ? (
        <div className="d-flex flex-column min-vh-100 position-relative">
          <div className="layout-wrapper layout-content-navbar flex-grow-1">
            <div className="layout-container" style={{ position: "relative" }}>
              {/* Main content */}
              <div className="layout-page bg-white">
                <div className="container h-15vh">
                  {/* Profile Section */}
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
                            <h6 className="ms-2 mb-0">
                              <span className="text-primary lh-1">Welcome</span>{" "}
                              <br /> User TP
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile and Upload Section */}
                <div className="container mt-1">
                  <div className="row">
                    <div className="container-fluid h-85vh">
                      <div className="content-wrapper h-100">
                        <div className="position-relative h-100 skyblue rounded p-3 mt-3">
                          <div className="hackthonProfile overflow-auto pe-2 h-100">
                            <div className="bg-white">
                              {/* Profile Image */}
                              <div className="row m-1">
                                <div className="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                                  <div className="w-max">
                                    <div className="userEditWrapper">
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
                                      <div className="userEditForm">
                                        <form action="#" id="editUserPicForm">
                                          <input
                                            type="file"
                                            className="d-none"
                                            id="editUserPic"
                                            onChange={handleFileChange}
                                          />
                                          <label htmlFor="editUserPic">
                                            <img
                                              src="../edit-user.svg"
                                              alt="userEditForm"
                                              width="25"
                                            />
                                          </label>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Upload Button */}
                                  <button
                                    className="btn btn-primary m-0 rounded-pill text-white"
                                    onClick={uploadImage}
                                  >
                                    Upload Logo
                                  </button>
                                </div>
                              </div>

                              {/* Profile Information */}
                              <div className="row mt-4 m-1">
                                <div className="col-lg-10">
                                  <div className="row">
                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={profile.company_name}
                                          disabled
                                        />
                                        <label>Corporate Name</label>
                                      </div>
                                    </div>

                                    {/* Other Profile Details */}
                                    {/* Add other fields for email, phone, etc. */}
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
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default ViewProfile;
