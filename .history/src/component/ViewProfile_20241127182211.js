import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // For fetching parameters from URL

const ViewProfile = () => {
  const { corpId } = useParams();  // Get the corpId from URL
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'; // Your token

  // Fetch the profile data based on corpId
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://103.35.121.219:4000/corp/profile/${corpId}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data); // Store profile data
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Unable to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <section>
        <div className="row credential">
          <div className="col-lg-6 bg-primary text-white bg-icons">
            <div className="warapper-form my-3">
              <h4 className="text-secondary text-end">
                View Profile
              </h4>

              <div className="wrapper-inner signupForm">
                <form className="bg-white" id="viewProfileForm">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="companyName"
                          value={profileData.companyName || ""}
                          readOnly
                        />
                        <label htmlFor="companyName">Company Name</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="emailId"
                          value={profileData.emailId || ""}
                          readOnly
                        />
                        <label htmlFor="emailId">Email</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          id="phoneNo"
                          value={profileData.phoneNo || ""}
                          readOnly
                        />
                        <label htmlFor="phoneNo">Phone Number</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={profileData.address || ""}
                          readOnly
                        />
                        <label htmlFor="address">Address</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="userid"
                          value={profileData.userid || ""}
                          readOnly
                        />
                        <label htmlFor="userid">User ID</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="passwd"
                          value={profileData.passwd || ""}
                          readOnly
                        />
                        <label htmlFor="passwd">Password</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={profileData.name || ""}
                          readOnly
                        />
                        <label htmlFor="name">Full Name</label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto mt-3">
                      <a
                        href={`/edit-profile/${corpId}`}
                        className="btn btn-primary rounded-pill w-100"
                      >
                        Edit Profile
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Slider Component */}
        </div>
      </section>
    </div>
  );
};

export default ViewProfile;
