import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [corpId, setCorpId] = useState(null);  // State to store corpId
  const [loading, setLoading] = useState(true);  // State to handle loading

  // Function to fetch the profile data using the corpId
  const fetchCorpId = async () => {
    try {
      // Fetch the profile information based on corpId
      const response = await fetch('/corp/dashboard/fetchProfile?corp_id=1');  // Replace '1' with the dynamic corp_id if needed

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json();

      // Log the response data to check
      console.log("API Response:", data);

      // Check if the response contains the profile data
      if (data && data.code === 1000 && data.profile) {
        // Set the profile data if successful
        setCorpId(data.profile.id);  // Set the dynamic corpId here
      } else {
        console.error("Profile data not found");
      }
    } catch (error) {
      console.error("Error fetching corpId:", error);
    } finally {
      setLoading(false);  // Turn off loading once data is fetched
    }
  };

  // useEffect hook to run the fetch function when the component mounts
  useEffect(() => {
    fetchCorpId();
  }, []);

  // Show loading state until corpId is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure that corpId is set and valid before trying to navigate
  console.log("Current corpId:", corpId);

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
                        {/* Conditional rendering based on the fetched corpId */}
                        {corpId ? (
                          <Link to={`/ViewProfile?corpId=${corpId}`} className="text-white text-decoration-none">
                            <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                          </Link>
                        ) : (
                          <span>Loading...</span>  // Display loading message while waiting for corpId
                        )}
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
                    <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} /><span className="mx-2 text-white"> Plan</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="menu-link mx-3 text-decoration-none">
                    <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: "white" }} /> <span className="mx-2 text-white">Logout</span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
