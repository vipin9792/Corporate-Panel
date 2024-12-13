import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { useParams,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
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
  const [logo, setLogo] = useState(null); // Store the selected logo file
  const [uploadedLogo, setUploadedLogo] = useState(null); // Store the uploaded logo URL or base64
  const [logoMessage, setLogoMessage] = useState("");
  
  useEffect(() => {
    // Fetch the profile data and logo URL on mount
    axios
      .post(
        "http://103.35.121.219:4000/corp/dashboard/fetchProfile",
        { corp_id: corp_id },
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1000) {
          setProfile(response.data.profile);
          // Set the logo if available in the profile data
          setUploadedLogo(response.data.profile.logo || null);
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
      setLogoMessage(""); // Clear any previous error message when a file is selected
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
      return; // Don't proceed if no logo is selected
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
        setUploadedLogo(base64Image); // Persist the updated logo in state
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
                <div
                  className="app-brand demo"
                  style={{ background: "#1C4481" }}
                >
                  <a href="index.html" className="app-brand-link">
                    <img
                      src="../logo1.png" style={{ mixBlendMode: "luminosity",opacity:"0.8"}}
                      alt="dashboard-active"
                      className="img-fluid"
                    />
                  </a>
                  <Link
                    to="/"
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                  >
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                  </Link>
                </div>
                <div className="menu-inner-shadow"></div>
                <ul
                  className="menu-inner py-1 demo"
                  style={{ background: "#1C4481" }}
                >
                  <li className="menu-item active">
                    <Link
                      to={`/Dashboard/${corp_id}`}
                      className="menu-link text-decoration-none"
                    >
                      <img
                        src="../dashboard-active.svg"
                        alt=""
                        className="menu-icon tf-icons bx bx-home-circle"
                      />
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
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        size="2x"
                        className="mx-2"
                        style={{ color: "white" }}
                      />
                      <span className="text-white mt-1">
                        Profile{" "}
                        <img
                          src="../down-arrow.png"
                          alt=""
                          width="30px"
                          height="20px"
                        />
                      </span>
                    </Link>
                    <div className="collapse" id="collapseProfile">
                      <ul>
                        <li className="menu-item mt-2">
                          <Link
                            to={`/ViewProfile/${corp_id}`}
                            className="text-white text-decoration-none"
                          >
                            <FontAwesomeIcon icon={faUserEdit} size="1x" /> View
                            Profile
                          </Link>
                        </li>
                        <li className="menu-item my-2">
                          <a
                            href="#tr"
                            className="text-white text-decoration-none"
                          >
                            <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo
                            Update
                          </a>
                        </li>
                        <br />
                      </ul>
                    </div>
                  </li>
                  <li className="menu-item">
                    <Link to={`/UpgradePlan/${corp_id}`} className="menu-link text-decoration-none">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        size="1x"
                        style={{ color: "white" }}
                      />
                      <span className="mx-2 text-white"> Plan</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                  <Link
                    to={`/TransectionPage/${corp_id}`}
                    className="menu-link text-decoration-none"
                  >
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white"> Transection</span>
                  </Link>
                </li>
                  <li>
                    <Link
                      to="/"
                      className="menu-link mx-3 text-decoration-none"
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="1x"
                        style={{ color: "white" }}
                      />{" "}
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
                            <img src="../d-user.svg" alt="d-user" className="img-fluid" width="50px" />
                            <h6 className="ms-2 mb-0">
                              <span className="text-primary lh-1">Welcome</span> <br /> User TP
                              <a href="">
                                <FontAwesomeIcon
                                  icon={faPen}
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
                                    <div className="userEditWrapper position-relative">
                                      {/* Display logo with update icon */}
                                      <img
                                        src={uploadedLogo || "https://admincp.pareekshn.in/cpareekshn/upload/orglogo/2022-1-12-T-15-4-36-793000000-2117/pareekshn_logo.jpg"}
                                        alt="Company Logo"
                                        style={{
                                          width: "200px",
                                          height: "80px",
                                          objectFit: "cover",
                                          borderRadius: "12px",
                                        }}
                                      />
                                      
                                      {/* Update icon overlay */}
                                      <div
                                        className="position-absolute"
                                        style={{
                                          top: "5px",
                                          right: "5px",
                                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                                          borderRadius: "50%",
                                          padding: "5px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => document.getElementById("fileInput").click()} // Trigger file input click on icon click
                                      >
                                        <FontAwesomeIcon
                                          icon={faPen}
                                          style={{
                                            color: "white",
                                            fontSize: "18px",
                                          }}
                                        />
                                      </div>

                                      {/* Hidden file input */}
                                      <input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        className="d-none"
                                        id="fileInput"
                                        onChange={handleLogoChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Update logo button */}
                              <div className="mt-3">
                                {logo && (
                                  <>
                                    <button
                                      className="btn btn-primary m-0 rounded-pill text-white"
                                      onClick={updateLogo}
                                    >
                                      Update Logo
                                    </button>
                                    {/* Display the logo message (error or success) */}
                                    {logoMessage && (
                                      <div className="text-danger mt-2">{logoMessage}</div>
                                    )}
                                  </>
                                )}

<Link
                                    to={`/EditProfile1/${corp_id}`}
                                    class="btn btn-primary m-0 rounded-pill text-white"
                                  >
                                    <img src="../edit.svg" alt="edit" /> Edit
                                  </Link>
                              </div>
                              

                              {/* Profile Details */}
                              <div className="row mt-4 m-1">
                                <div className="col-lg-10">
                                  <div className="row">


                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="floatingInput"
                                          required=""
                                          placeholder="Corporate Name"
                                          value={profile.company_name}
                                          disabled
                                        />
                                        <label htmlFor="floatingInput">Corporate Name</label>
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
                                          <Link
                                            to="#"
                                            type="submit"
                                            class="btn btn-primary w-100 rounded-pill text-white"
                                          >
                                            Save
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
									



                                    
                                    {/* Additional profile fields */}
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
          <Footer />
        </div>
      ) : (
        <p>No profile data available</p>
      )}

    </div>
  );
};

export default ViewProfile;
