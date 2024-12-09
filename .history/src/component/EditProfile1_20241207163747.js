import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile1 = ({ corp_id }) => {
  const navigate = useNavigate();

  // Form state to handle input values
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
    address: "",
    userid: "",
  });

  // Error state to display any error message
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show what data is being sent for debugging
    console.log("Submitting data:", formData);

    try {
      // Make the API request
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

      // Handle API response
      if (response.data.code === 1000) {
        alert("Profile updated successfully!");
        navigate(`/ViewProfile/${corp_id}`);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while saving changes.");
    }
  };

  return (
    <div>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            <div className="layout-page bg-white">
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
                                      src="https://admincp.pareekshn.in/cpareekshn/upload/orglogo/2022-1-12-T-15-4-36-793000000-2117/pareekshn_logo.jpg"
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
                              </div>
                            </div>

                            <div className="row mt-4 m-1">
                              <div className="col-lg-10">
                                <form onSubmit={handleSubmit}>
                                  <div className="row">
                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="company_name"
                                          name="company_name"
                                          required
                                          placeholder="Corporate Name"
                                          value={formData.company_name}
                                          onChange={handleInputChange}
                                        />
                                        <label htmlFor="company_name">
                                          Corporate Name
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="email"
                                          className="form-control"
                                          id="email"
                                          name="email"
                                          required
                                          placeholder="Email"
                                          value={formData.email}
                                          onChange={handleInputChange}
                                        />
                                        <label htmlFor="email">Email</label>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="phone"
                                          name="phone"
                                          value={formData.phone}
                                          onChange={handleInputChange}
                                          placeholder="Corporate Mobile Number"
                                        />
                                        <label htmlFor="phone">
                                          Corporate Mobile Number
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="address"
                                          name="address"
                                          required
                                          placeholder="Corporate Location"
                                          value={formData.address}
                                          onChange={handleInputChange}
                                        />
                                        <label htmlFor="address">
                                          Corporate Location
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                      <div className="form-floating">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="userid"
                                          name="userid"
                                          required
                                          placeholder="Corporate User ID"
                                          value={formData.userid}
                                          onChange={handleInputChange}
                                        />
                                        <label htmlFor="userid">
                                          Corporate User ID
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                      <button
                                        type="submit"
                                        className="btn btn-primary w-100 rounded-pill text-white"
                                      >
                                        Save Change
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}
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
  );
};

export default EditProfile1;
