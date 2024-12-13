import React from "react";

import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faKey,
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { corp_id } = useParams();

  return (
    <>
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
        <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
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
                    <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                  </Link>
                </li>
                <li className="menu-item my-2">
                  <Link
                    to={`/UpdateLogo/${corp_id}`}
                    className="text-white text-decoration-none"
                  >
                    <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo Update
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
            <Link to="/" className="menu-link mx-3 text-decoration-none">
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
    </>
  );
};

export default Navbar;
