import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [corpId, setCorpId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the query params using the Location API from react-router
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const fetchedCorpId = urlParams.get('corpId');  // Extract 'corpId' from the query params
    setCorpId(fetchedCorpId); // Set the corpId into state

    // Fetch profile data if corpId is available
    if (fetchedCorpId) {
      fetchProfileData(fetchedCorpId);
    }
  }, [location.search]);  // Re-run if the URL changes

  // Function to fetch the profile data using corpId
  const fetchProfileData = async (corpId) => {
    try {
      setIsLoading(true);  // Set loading state to true before making the request
      setError(null);  // Reset any previous errors

      // Make the API request
      const response = await fetch(`http://103.35.121.219:4000/corp/dashboard/fetchProfile?corpId=${corpId}`, {
        method: 'Ge',
        headers: {
          'Authorization': 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',  // Replace with your actual token
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.statusText}`);
      }

      const data = await response.json();  // Parse the JSON response

      if (data.code === 1000) {
        setProfileData(data.profile);  // Set profile data into state
      } else {
        throw new Error('Failed to fetch profile data. Invalid response.');
      }
    } catch (err) {
      setError(err.message);  // Set the error message
      console.error('Error fetching profile data:', err);
    } finally {
      setIsLoading(false);  // Set loading state to false after request completion
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;  // Display loading text while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error message if there's an issue with fetching data
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: 'relative' }}>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: '100vh', zIndex: 1 }}>
              <div className="app-brand demo" style={{ background: '#1C4481' }}>
                <a href="index.html" className="app-brand-link">
                  <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
                </a>
                <Link to="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                  <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </Link>
              </div>
              <div className="menu-inner-shadow"></div>
              <ul className="menu-inner py-1 demo" style={{ background: '#1C4481' }}>
                <li className="menu-item active">
                  <Link to="/dashboard" className="menu-link text-decoration-none">
                    <img src="dashboard-active.svg" alt="" className="menu-icon tf-icons bx bx-home-circle" />
                    <div>Dashboard</div>
                  </Link>
                </li>
                <br />
                <li>
                  <Link data-bs-toggle="collapse" data-bs-target="#collapseProfile" aria-expanded="false" aria-controls="collapseProfile" className="d-flex cursor-pointer text-decoration-none">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" className="mx-2" style={{ color: 'white' }} />
                    <span className="text-white mt-1">Profile <img src="down-arrow.png" alt="" width="30px" height="20px" /></span>
                  </Link>
                  <div className="collapse" id="collapseProfile">
                    <ul>
                      <li className="menu-item mt-2">
                        <Link to="/viewProfile" className="text-white text-decoration-none">
                          <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                        </Link>
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
                    <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: 'white' }} />
                    <span className="mx-2 text-white"> Plan</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="menu-link mx-3 text-decoration-none">
                    <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: 'white' }} />
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
                      <div className="col-lg-6">
                        <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                          <img src="d-user.svg" alt="d-user" className="img-fluid" width="50px" />
                          <h6 className="ms-2 mb-0 ">
                            <span className="text-primary lh-1">Welcome</span> <br /> User TP
                            <a href="">
                              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'grey', position: 'relative', left: '25%', marginBottom: '8px', width: '35px', height: '15px' }} />
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mt-1">
                <div className="alert " role="alert" style={{ background: '#EDF2FF', borderRadius: '10px' }}>
                  <h4 className="">Active Plan Free</h4>
                  <p>Your current plan is the Free Plan. Upgrade to a premium plan for more features!</p>
                  <Link to="/UpgradePlan" className="btn btn text-white" style={{ background: '#1C4481' }}>Upgrade Plan</Link>
                </div>

                <div className="row">
                  {/* Card 1: Total Hackathon */}
                  <div className="col-md-4 mb-4 rounded-lg">
                    <span href="#" className="card text-center card-light-blue" style={{ background: '#4775d1', borderRadius: '22px' }}>
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="flex-grow-1 text-start">
                          <img src="batch.svg" alt="" />
                          <h5 className="card-title my-2 text-white fs-5" style={{ width: '110px' }}>Total Hackathon</h5>
                        </div>
                        <div className="card-data text-start">
                          <span className="fs-2 text-white">10</span>
                        </div>
                      </div>
                    </span>
                  </div>

                  {/* Card 2: Total Projects */}
                  <div className="col-md-4 mb-4 rounded-lg">
                    <span href="#" className="card text-center card-light-blue" style={{ background: '#4775d1', borderRadius: '22px' }}>
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="flex-grow-1 text-start">
                          <img src="project.svg" alt="" />
                          <h5 className="card-title my-2 text-white fs-5" style={{ width: '110px' }}>Total Projects</h5>
                        </div>
                        <div className="card-data text-start">
                          <span className="fs-2 text-white">7</span>
                        </div>
                      </div>
                    </span>
                  </div>

                  {/* Card 3: Pending Projects */}
                  <div className="col-md-4 mb-4 rounded-lg">
                    <span href="#" className="card text-center card-light-blue" style={{ background: '#4775d1', borderRadius: '22px' }}>
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="flex-grow-1 text-start">
                          <img src="pending.svg" alt="" />
                          <h5 className="card-title my-2 text-white fs-5" style={{ width: '110px' }}>Pending Projects</h5>
                        </div>
                        <div className="card-data text-start">
                          <span className="fs-2 text-white">3</span>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
