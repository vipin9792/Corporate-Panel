import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toastify
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const EditProfile1 = () => {
  const { corp_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
    address: "",
    userid: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          const { company_name, email, phone_no, address, username } =
            response.data.profile;
          setFormData({
            company_name,
            email,
            phone: phone_no,
            address,
            userid: username,
          });
        } else {
          setError("Failed to fetch profile data");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", formData);

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/dashboard/updateProfile",
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
        // Show success toast
        toast.success("Profile updated successfully!");

        // Delay navigation by 2 seconds to allow toast to appear
        setTimeout(() => {
          navigate(`/ViewProfile/${corp_id}`);
        }, 2000); // 2 seconds delay
      } else {
        setError("Failed to update profile. Please try again.");
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while saving changes");
      toast.error("An error occurred while saving changes");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">



        <div className="layout-container" style={{ position: "relative" }}>


          

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
                <div class="container-fluid  h-85vh">
                  <div class="content-wrapper h-100">
                    <div class="position-relative h-100 skyblue rounded p-3 mt-3">
                      <div class="hackthonProfile overflow-auto pe-2 h-100">
                        <div class=" bg-white">
                          <div class="row m-1">
                            <div class="col-lg-12 d-flex justify-content-between align-items-start rounded p-3">
                              <div class="w-max">
                                <div class="userEditWrapper">
                                  {/* <img src={profile.logo} alt="Profile Logo" style={{ maxWidth: '100px', height: 'auto' }} />  */}

                                  <img
                                    src="../logo1.png"
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
                                          width="25"
                                          style={{marginRight:"784px",marginTop:"-734px"}}
                                        />
                                      </label>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row mt-4 m-1">
                            <div class="col-lg-10">
                              <form onSubmit={handleSubmit}>
                                <div class="row">
                                  <div class="col-lg-6 mb-3">
                                    <div class="form-floating">
                                      <input
                                        type="text"
                                        class="form-control"
                                        id="floatingInput"
                                        required=""
                                        placeholder="Corporate Name"
                                        value={formData.company_name}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            company_name: e.target.value,
                                          })
                                        }
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
                                        value={formData.email}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            email: e.target.value,
                                          })
                                        }
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
                                        value={formData.phone}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            phone: e.target.value,
                                          })
                                        }
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
                                        value={formData.address}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            address: e.target.value,
                                          })
                                        }
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
                                        value={formData.userid}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            userid: e.target.value,
                                          })
                                        }
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
                                        <button
                                          type="submit"
                                          class="btn btn-primary w-100 rounded-pill text-white"
                                        >
                                          Save Change
                                        </button>
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


          
        </div>










      </div>


















      <br />
      <br />
      <br />
      <Footer />
    </div>
    {/* Toast container to display toasts */}
    <ToastContainer />

  </div>
);
};
export default EditProfile1;