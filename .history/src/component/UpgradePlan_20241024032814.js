import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faBriefcase, faBuilding, faShieldAlt, faCrown } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const plansData = [
    {
        name: "Basic Plan",
        monthlyPrice: "$10/month",
        yearlyPrice: "$100/year",
        features: ["10 GB Storage", "Basic Support", "Access to Features"],
        icon: faUser,
        color: "linear-gradient(135deg, #6a11cb, #2575fc)"
    },
    {
        name: "Standard Plan",
        monthlyPrice: "$20/month",
        yearlyPrice: "$200/year",
        features: ["50 GB Storage", "Priority Support", "All Features Included"],
        icon: faUsers,
        color: "linear-gradient(135deg, #3a6073, #3a9475)"
    },
    {
        name: "Premium Plan",
        monthlyPrice: "$30/month",
        yearlyPrice: "$300/year",
        features: ["Unlimited Storage", "24/7 Support", "Advanced Features"],
        icon: faBriefcase,
        color: "linear-gradient(135deg, #ff7e5f, #feb47b)"
    },
    {
        name: "Business Plan",
        monthlyPrice: "$40/month",
        yearlyPrice: "$400/year",
        features: ["100 GB Storage", "Dedicated Support", "Custom Features"],
        icon: faBuilding,
        color: "linear-gradient(135deg, #00c6ff, #0072ff)"
    },
    {
        name: "Enterprise Plan",
        monthlyPrice: "$50/month",
        yearlyPrice: "$500/year",
        features: ["Unlimited Storage", "24/7 Premium Support", "Advanced Security Features"],
        icon: faShieldAlt,
        color: "linear-gradient(135deg, #f12711, #f5af19)"
    },
    {
        name: "Ultimate Plan",
        monthlyPrice: "$100/month",
        yearlyPrice: "$1000/year",
        features: ["Unlimited Storage", "24/7 Dedicated Support", "All Features Included"],
        icon: faCrown,
        color: "linear-gradient(135deg, #00b09b, #96c93d)"
    },
];

const UpgradePlan = () => {
    const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-primary"
          >
            <div className="app-brand demo" style={{ background: "#1C4481" }}>
              <a href="index.html" className="app-brand-link">
                <img
                  src="logo1.png"
                  alt="dashboard-active"
                  className="img-fluid"
                />
              </a>
              <Link
                href="/"
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
                <a
                  href="dashboard.html"
                  className="menu-link text-decoration-none"
                >
                  <img
                    src="dashboard-active.svg"
                    alt=""
                    className="menu-icon tf-icons bx bx-home-circle"
                  />
                  <div data-i18n="Analytics">Dashboard</div>
                </a>
              </li>
              <br />
              <li>
                <Link
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  className="d-flex cursor-pointer text-decoration-none"
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="2x"
                    className="mx-2"
                    style={{ color: "white" }}
                  />
                  <span className="text-white mt-1">
                    Profile&nbsp;&nbsp;&nbsp;{" "}
                    <img
                      src="down-arrow.png"
                      alt=""
                      width="30px"
                      height="20px"
                    />
                  </span>
                </Link>

                <div className="collapse" id="collapseExample">
                  <ul>
                    <li className="menu-item mt-2">
                      <Link to="/" className="text-white text-decoration-none">
                        <FontAwesomeIcon icon={faUserEdit} size="1x" />
                        &nbsp;&nbsp; View Profile
                      </Link>
                    </li>
                    <li className="menu-item my-2">
                      <a href="#tr" className="text-white text-decoration-none">
                        <FontAwesomeIcon icon={faCoffee} size="1x" />
                        &nbsp;&nbsp;&nbsp;Logo Update
                      </a>
                    </li>
                    <br />
                  </ul>
                </div>
              </li>
              <li className="menu-item">
                <Link to="/" className="menu-link text-decoration-none">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size="1x"
                    style={{ color: "white" }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="text-white">Plan</div>
                </Link>
              </li>
              <li>
                <Link to="/" className="menu-link mx-3 text-decoration-none">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="1x"
                    style={{ color: "white" }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <div className="text-white">Logout</div>
                </Link>
              </li>
            </ul>
          </aside>

          <div className="layout-page bg-white">
            <div className="container h-15vh">
              <div className="row mt-3 align-items-center">
                <div className="col-lg-8">
                  <h4 className="fw-bold text-primary">Edit Profile</h4>
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
            </div><br />

           

            <div className="hero" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", color: "white", padding: "60px 0", textAlign: "center" }}>
    <h1 className="display-4 text-white">Choose Your Upgrade Plan</h1>
    <p className="lead">Find the perfect plan that fits your needs.</p>
</div>

<div className="container text-center my-4">
    <button className={`btn ${isYearly ? 'btn-outline-light' : 'btn-light'}`} onClick={() => setIsYearly(false)}>Monthly</button>&nbsp;&nbsp;
    <button className={`btn ${isYearly ? 'btn-light' : 'btn-outline-light'}`} onClick={() => setIsYearly(true)}>Yearly</button>
</div>

<div className="container mt-5">
    <div className="row text-center">
        {plansData.map(plan => (
            <div className="col-md-4 mb-4" key={plan.name}>
                <div className="card" style={{ background: "rgba(255, 255, 255, 0.9)", border: "none", transition: "transform 0.3s, box-shadow 0.3s", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}>
                    <div className="card-header" style={{ background: "rgba(0, 128, 255, 0.7)", color: "white" }}>
                        <h3>{plan.name}</h3>
                    </div>
                    <div className="card-body" style={{ background: "rgba(50, 50, 50, 0.7)", color: "white" }}>
                        <div style={{ fontSize: "50px", marginBottom: "15px" }}>
                            <FontAwesomeIcon icon={plan.icon} />
                        </div>
                        <h2 className="card-title">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</h2>
                        <p className="card-text">Features:</p>
                        <ul className="list-unstyled">
                            {plan.features.map((feature, index) => (
                                <li key={index}>✔ {feature}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer" style={{ background: "rgba(255, 69, 0, 0.7)" }}>
                        <Link to="/" className="btn btn-light">Choose Plan</Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>

            
 




            
          </div>
        </div>
      </div>
    </>
  );
};

export default UpgradePlan;
