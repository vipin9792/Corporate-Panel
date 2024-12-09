import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword1 = () => {
  const [error1, setError1] = useState("");
  const [carouselData, setCarouselData] = useState([]);
  const { token, corpId } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/init/getPhotoSlider",
          {},
          {
            headers: {
              Authorization:
                "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        if (response.data.code === 1000) {
          setCarouselData(response.data.photos);
        } else {
          setError1("Failed to fetch carousel data");
        }
      } catch (err) {
        setError1("Error fetching data");
      }
    };

    fetchCarouselData();
  }, []);

  useEffect(() => {
    if (!token || !corpId) {
      setError("Invalid or expired token/corpId.");
      toast.error("Token or corpId is missing or invalid!");
    } else {
      console.log("Token and Corp ID received:", token, corpId);
    }
  }, [token, corpId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match!");
      return;
    }

    console.log("Sending API request with the following data:", {
      corp_id: corpId,
      otp: otp,
      new_password: newPassword,
      token: token,
    });

    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/recovery/resetPassword",
        {
          corp_id: corpId,
          otp: otp,
          new_password: newPassword,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      console.log("Reset password API response:", response);

      if (response.data.code === 1000) {
        setMessage("Password successfully reset!");
        toast.success("Password successfully reset!");
        console.log("Password reset success!");
        setTimeout(() => {
          navigate("/LoginForm");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to reset password.");
        toast.error(response.data.message || "Failed to reset password.");
        console.log("Failed to reset password:", response.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while resetting the password.");
      toast.error("An error occurred during password reset!");
      console.log("Error details:", err);
    }
  };

  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img
                  src="/logo1.png"
                  alt="logo"
                  id="logo"
                  style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
                />
                <img src="/pen-scale.svg" alt="bg-icon-1" />
                <img src="/boy.svg" alt="boy" />
                <img src="/bulb1.svg" alt="bulb1" />
                <img src="/computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form p-5">
                <h4 className="text-secondary my-2 text-center">
                  Reset your password
                </h4>
                <br />

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingOtp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingOtp">
                          <span>
                            <i className="bi bi-lock"></i>
                          </span>
                          OTP*
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingPassword">
                          <span>
                            <img
                              src="/password.svg"
                              alt="Password Icon"
                              className="icon"
                            />
                            &nbsp;
                          </span>
                          New Password*
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingConfirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingConfirmPassword">
                          <span>
                            <img
                              src="/password.svg"
                              alt="Password Icon"
                              className="icon"
                            />
                            &nbsp;
                          </span>
                          Confirm Password*
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-10 mx-auto">
                      <div className="form-floating mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary rounded-pill w-100"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
              </div>
            </div>

            <div className="col-lg-6 bg-white bg-icons-right">
              <h4>
                About <br /> <span className="fw-bold">Pareekshan</span>
              </h4>
              <div className="/imageicon1 signupFormIcons">
                <img src="/book.svg" alt="book" />
                <img
                  src="/star-boy.svg"
                  alt="star-boy"
                  style={{ position: "absolute", left: "45%" }}
                />
                <img
                  src="/support.svg"
                  alt="support"
                  style={{ position: "absolute", top: "30%" }}
                />
                <img
                  src="/gradutation-cap.svg"
                  alt="graduation-cap"
                  className="img-fluid"
                  style={{ position: "absolute", top: "85%", right: "30%" }}
                />
                <img
                  src="/puzzle.svg"
                  alt="puzzle"
                  style={{ position: "absolute", left: "85%", top: "45%" }}
                />
              </div>

              <div
                className="warapper-form-alert carouselWrapper"
                style={{ marginTop: "40px" }}
              >
                <div
                  id="carouselExample"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  style={{ width: "400px", margin: "auto" }}
                >
                  <div className="carousel-inner">
                    {carouselData.length > 0 ? (
                      carouselData.map((item, index) => (
                        <div
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                          key={item.id}
                        >
                          <img
                            src={item.photo_url}
                            className="d-block w-100"
                            alt={`Slide ${item.id}`}
                          />
                          <div className="carousel-content text-center">
                            <h5 style={{ color: "grey" }}>{item.photo_text}</h5>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active">
                        <img
                          src="item-1.svg"
                          className="d-block w-100"
                          alt="First slide"
                        />
                        <div className="carousel-content text-center">
                          <h5>No Data Available</h5>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="carousel-buttons text-center mt-3">
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="prev"
                    >
                      <i className="bi bi-chevron-left text-white fs-6"></i>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="next"
                    >
                      <i className="bi bi-chevron-right text-white fs-6"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast container for displaying toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default C;
