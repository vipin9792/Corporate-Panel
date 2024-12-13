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
  const [selectedImage, setSelectedImage] = useState(null); // State for image preview
  const [imageUrl, setImageUrl] = useState(""); // State for the image URL from the server

  useEffect(() => {
    // Fetch the profile data (including image) on page load
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
          // Set the image URL from the server (if available)
          setImageUrl(response.data.profile.logo); // Assuming 'logo' holds the image URL
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append("image", file);
      formData.append("corp_id", corp_id); // Send corp_id to associate the image with the profile

      // Upload the image to the server via API
      axios
        .post(
          "http://103.35.121.219:4000/corp/uploadImage", // Replace with the correct API endpoint for image upload
          formData,
          {
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.code === 1000) {
            // Image upload successful, update the profile image URL
            setImageUrl(response.data.imageUrl); // Assuming the response contains the image URL
          } else {
            setError("Error uploading image");
          }
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          setError("Error uploading image");
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {profile ? (
        <div className="d-flex flex-column min-vh-100 position-relative">
          {/* Your existing layout here */}
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
                            <div class="userEditWrapper">
                                      {/* <img src={profile.logo} alt="Profile Logo" style={{ maxWidth: '100px', height: 'auto' }} />  */}

                                      <img
                                        src="https://admincp.pareekshn.in/cpareekshn/upload/orglogo/2022-1-12-T-15-4-36-793000000-2117/pareekshn_logo.jpg"
                                        alt="Company Logo"
                                        style={{
                                          width: "200px",
                                          height: "80px",
                                          objectFit: "cover",
                                          borderRadius: "12px",
                                        }}
                                      />

                                      <div class="userEditForm">
                                        <form action="#" id="editUserPicForm">
                                          <input
                                            type="file"
                                            class="d-none"
                                            id="editUserPic"
                                          />
                                          <label for="editUserPic">
                                            <img
                                              src="../edit-user.svg"
                                              alt="userEditForm"
                                              width="25" style={{marginRight:"784px",marginTop:"-724px"}}
                                            />
                                          </label>
                                        </form>
                                      </div>
                                    </div>
                                  </div>

                                  <Link
                                    to={`/EditProfile1/${corp_id}`}
                                    class="btn btn-primary m-0 rounded-pill text-white"
                                  >
                                    <img src="../edit.svg" alt="edit" /> Edit
                                  </Link>
                                </div>
                              </div>
                              <div class="row mt-4 m-1">
                                <div class="col-lg-10">
                                  <div class="row">
                                    <div class="col-lg-6 mb-3">
                                      <div class="form-floating">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="floatingInput"
                                          required=""
                                          placeholder="Corporate Name"
                                          value={profile.company_name}
                                          disabled
                                        />
                                        <label for="floatingInput">
                                          <span>
                                            <img
                                              src="../user.svg"
                                              alt="Banner title"
                                              class="img-fluid"
                                            />
                                          </span>{" "}
                                          Corporate Name
                                        </label>
                                      </div>
                                    </div>

                                    <div class="col-lg-6 mb-3">
                                      <div class="form-floating">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="floatingInput"
                                          required=""
                                          placeholder="Email@email.com"
                                          value={profile.email}
                                          disabled
                                        />
                                        <label for="floatingInput">
                                          <span>
                                            <img
                                              src="../email.svg"
                                              alt="Banner title"
                                              class="img-fluid"
                                            />
                                          </span>{" "}
                                          Email
                                        </label>
                                      </div>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                      <div class="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="phone"
                                          value={profile.phone_no}
                                        />
                                        <label for="floatingInput">
                                          <span>
                                            <img
                                              src=" ../contact.svg"
                                              alt="Banner title"
                                              class="img-fluid"
                                            />
                                          </span>{" "}
                                          Corporate Mobile Number
                                        </label>
                                      </div>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                      <div class="form-floating">
                                        <input
                                          type="text"
                                          class="form-control"
                                          id="floatingInput"
                                          required=""
                                          placeholder="Corporate Location"
                                          value={profile.address}
                                        />
                                        <label for="floatingInput">
                                          <span>
                                            <img
                                              src="../location.svg"
                                              alt="Banner title"
                                              class="img-fluid"
                                            />
                                          </span>{" "}
                                          Corporate Location
                                        </label>
                                      </div>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                      <div class="form-floating">
                                        <input
                                          type="text"
                                          class="form-control"
                                          placeholder="Corporate User ID"
                                          required=""
                                          value={profile.username}
                                          disabled
                                        />
                                        <label for="floatingInput">
                                          <span>
                                            <img
                                              src="../banner-title.svg"
                                              alt="Banner title"
                                              class="img-fluid"
                                            />
                                          </span>
                                          Corporate User ID*
                                        </label>
                                      </div>
                                    </div>

                                    <div class="col-lg-6 mb-3">
                                      <div class="form-floating pass ">
                                        <input
                                          type="password"
                                          class="form-control"
                                          id="floatingPassword"
                                          placeholder="Password"
                                          required=""
                                         
                                        />
                                        <label for="floatingPassword">
                                          <img
                                            src="../email.svg"
                                            alt="pass"
                                            class="img-fluid position-absolute"
                                          />{" "}
                                          <span class="ms-4">Passward</span>
                                        </label>
                                        <a href="#icon" class="ms-auto">
                                          <img
                                            src="../hide-pass.svg"
                                            id="Passwordicon"
                                            class="img-fluid"
                                          />
                                        </a>
                                      </div>
                                    </div>

                                    <div class="col-lg-12  mb-3">
                                      <div class="row">
                                        <div class="col-lg-6">
                                          <a
                                            href="#"
                                            type="submit"
                                            class="btn btn-primary w-100 rounded-pill text-white"
                                          >
                                            Save
                                          </a>
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
