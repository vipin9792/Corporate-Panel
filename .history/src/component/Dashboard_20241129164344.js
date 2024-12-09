import React, { useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [corpId, setCorpId] = useState(null);

  // Fetch corp_id from localStorage on component mount
  useEffect(() => {
    const storedCorpId = localStorage.getItem("corp_id");
    if (storedCorpId) {
      setCorpId(storedCorpId);
    } else {
      // Redirect to login if there's no corp_id
      navigate("/login");
    }
  }, [navigate]);

  const handleViewProfile = () => {
    if (corpId) {
      navigate(`/ViewProfile/${corpId}`);
    }
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: "100vh", zIndex: 1 }}>
              <div className="app-brand demo" style={{ background: "#1C4481" }}>
                <a href="index.html" className="app-brand-link">
                  <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
                </a>
                <Link to="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                  <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </Link>
              </div>
              <div className="menu-inner-shadow"></div>
              <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
                <li className="menu-item active">
                  <Link to="/dashboard" className="menu-link text-decoration-none">
                    <img src="dashboard-active.svg" alt="" className="menu-icon tf-icons bx bx-home-circle" />
                    <div data-i18n="Analytics">Dashboard</div>
                  </Link>
                </li>
                <br />
                <li>
                  <Link data-bs-toggle="collapse" data-bs-target="#collapseProfile" aria-expanded="false" aria-controls="collapseProfile" className="d-flex cursor-pointer text-decoration-none">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" className="mx-2" style={{ color: "white" }} />
                    <span className="text-white mt-1">Profile <img src="down-arrow.png" alt="" width="30px" height="20px" /></span>
                  </Link>
                  <div className="collapse" id="collapseProfile">
                    <ul>
                      <li className="menu-item mt-2">
                        <button onClick={handleViewProfile} className="text-white text-decoration-none">
                          <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                        </button>
                      </li>
                      <li className="menu-item my-2">
                        <a href="#tr" className="text-white text-decoration-none">
                          <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo Update
                        </a>
                      </li>
                      <br />
                    </ul>
                  </div>
                </li>
                <li className="menu-item">
                  <Link to="/" className="menu-link text-decoration-none">
                    <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} />
                    <span className="mx-2 text-white">Plan</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="menu-link mx-3 text-decoration-none">
                    <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: "white" }} />
                    <span className="mx-2 text-white">Logout</span>
                  </Link>
                </li>
              </ul>
            </aside>
            <div className="layout-page bg-white">
              {/* Dashboard Content */}
              <div className="container mt-1">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="card text-center" style={{ background: "#936963" }}>
                      <div className="text-white mt-4" style={{ background: "#936963" }}>
                        Assessment Console
                      </div>
                      <br />
                      <div className="card-body" style={{ background: "#936963" }}>
                        <button type="submit" className="btn btn-danger border-secondary text-bold p-2" style={{ marginTop: "-27px", background: "#1C4481" }}>
                          Assess Assessment Console
                        </button>
                        <p className="card-text mb-5 text-white">Manage users, exams, and settings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;