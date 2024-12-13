import React from "react";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faKey, faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const { corp_id } = useParams(); // Get corp_id directly from URL
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-primary"
              style={{ height: "100vh", zIndex: 1 }}
            >
              <div className="app-brand demo" style={{ background: "#1C4481" }}>
                <a href="index.html" className="app-brand-link">
                  <img
                    src="../logo1.png"
                    style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
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
                    <div>Dashboard</div>
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
                        <Link
                          to={`/UpdateLogo/${corp_id}`}
                          className="text-white text-decoration-none"
                        >
                          <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo
                          Update
                        </Link>
                      </li>
                      <br />
                    </ul>
                  </div>
                </li>

                <li className="menu-item">
                  <Link
                    to={`/UpgradePlan/${corp_id}`}
                    className="menu-link text-decoration-none"
                  >
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
                  <Link to="/" onClick={handleLogout} className="menu-link mx-3 text-decoration-none">
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
                    <h4 className="fw-bold text-primary">Dashboard</h4>
                  </div>
                  <div className="col-lg-4">
                    <div className="row justify-content-end">
                      <div className="col-lg-6" style={{ width: "250px" }}>
                        <div className="border rounded-pill d-flex align-items-center upDashboard">
                          <img
                            src="../d-user.svg"
                            alt="d-user"
                            className="img-fluid"
                            width="50px"
                          />
                          <h6 className="ms-2 mb-0">
                            <span className="text-primary lh-1">Welcome
                            <br /> User TP </span>

                            <div className="dropdown d-inline">
                              <button
                                className="btn btn-link"
                                type="button"
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <FontAwesomeIcon
                                  icon={faCaretDown}
                                  style={{
                                    color: "grey",
                                    width: "20px",
                                    height: "20px",
                                  }}
                                />
                              </button>
                              <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="userDropdown"
                              >
                                <li>
                                  <Link className="dropdown-item" to={`/ViewProfile/${corp_id}`}>
                                    <FontAwesomeIcon
                                      icon={faUserCircle}
                                      className="me-2"
                                      style={{ color: "grey" }}
                                    />
                                    View Profile
                                  </Link>
                                </li>

                                <li>
                                  <Link className="dropdown-item" to={`/ChangePassword/${corp_id}`}>
                                    <FontAwesomeIcon
                                      icon={faKey}
                                      className="me-2"
                                      style={{ color: "grey" }}
                                    />
                                    Change Password
                                  </Link>
                                </li>

                                <li>
                                  <Link className="dropdown-item" to="#" onClick={handleLogout}>
                                    <FontAwesomeIcon
                                      icon={faSignOutAlt}
                                      className="me-2"
                                      style={{ color: "grey" }}
                                    />
                                    Logout
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h1>ghghjgjggj</h1>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Navbar;
