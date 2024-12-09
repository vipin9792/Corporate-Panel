import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // Get corp_id from the URL parameters
  const { corp_id } = useParams();

  useEffect(() => {
    // You can use corp_id to fetch more data if necessary
    console.log('Corp ID from URL:', corp_id);
  }, [corp_id]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: 'relative' }}>
            {/* Sidebar code */}
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: '100vh', zIndex: 1 }}>
              {/* Menu code */}
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
                          <h6 className="ms-2 mb-0">
                            <span className="text-primary lh-1">Welcome</span> <br /> User TP
                            <Link to={`/ViewProfile/${corp_id}`}>
                              <FontAwesomeIcon icon={faUserCircle} style={{ color: 'grey' }} />
                            </Link>
                            <a href="">
                              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'grey', width: '35px', height: '15px' }} />
                            </a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container mt-1">
                {/* Other dashboard content */}

                {/* Example of using the corp_id in a link */}
                <div className="row">
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
                      <div className="mb-4 my-2">
                        <button className="btn btn-light border-secondary">View Details</button>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
