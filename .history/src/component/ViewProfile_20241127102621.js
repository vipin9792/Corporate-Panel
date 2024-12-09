import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation(); // to access query parameters

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your Bearer Token

  // Extract corpId and email from query parameters
  const searchParams = new URLSearchParams(location.search);
  const corpId = searchParams.get("corpId");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!corpId) {
      setError("No company ID found. Please log in again.");
      alert("No company ID found. Please log in again.");
      navigate("/signup"); // Redirect to signup if corpId is not found
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          'http://103.35.121.219:4000/corp/dashboard/fetchProfile',
          { corp_id: corpId },
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
  }, [corpId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        {/* Your existing sidebar and layout code */}
        <div className="layout-page bg-white">
          <div className="container h-15vh">
            <div className="row mt-3 align-items-center">
              <div className="col-lg-8">
                <h4 className="fw-bold text-primary">Dashboard / Corporate Profile</h4>
              </div>
              <div className="col-lg-4">
                <div className="row justify-content-end">
                  <div className="col-lg-6">
                    <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                      <img
                        src="d-user.svg"
                        alt="d-user"
                        className="img-fluid"
                        width="50px"
                      />
                      <h6 className="ms-2 mb-0">
                        <span className="text-primary lh-1">Welcome</span> <br />
                        {email}
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

          {/* Profile Form */}
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
                              {/* Displaying company logo */}
                              <img
                                src="https://admincp.pareekshn.in/cpareekshn/upload/orglogo/2022-1-12-T-15-4-36-793000000-2117/pareekshn_logo.jpg"
                                alt="Company Logo"
                                style={{ width: "200px", height: "80px", objectFit: "cover", borderRadius: "12px" }}
                              />
                            </div>
                            <Link to="/EditProfile1" className="btn btn-primary m-0 rounded-pill text-white">
                              <img src="edit.svg" alt="edit" /> Edit
                            </Link>
                          </div>
                        </div>

                        {/* Profile Data Form */}
                        <div className="row mt-4 m-1">
                          <div className="col-lg-10">
                            <div className="row">
                              {/* Render profile fields */}
                              <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Corporate Name"
                                    value={profileData ? profileData.company_name : ""}
                                    readOnly
                                  />
                                  <label htmlFor="floatingInput">Corporate Name</label>
                                </div>
                              </div>

                              {/* Other profile fields */}
                              <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    placeholder="Email"
                                    value={profileData ? profileData.email : ""}
                                    readOnly
                                  />
                                  <label htmlFor="floatingInput">Email</label>
                                </div>
                              </div>
                              {/* Add more fields as needed */}
                            </div>
                          </div>
                        </div>

                        <Footer />
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
  );
};

export default ViewProfile;
