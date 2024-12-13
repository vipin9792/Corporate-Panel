import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


import {
  fetchDashboardDetails,
  fetchSubscriptionTransactions,
} from "../Api Folder/DashboardApi";
import Footer from "./Footer";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown,  faKey } from '@fortawesome/free-solid-svg-icons';
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { corp_id } = useParams();

  const [data, setData] = useState({ exam: 0, batch: 0, student: 0 });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for corp_id:", corp_id);

        const dashboardResponse = await fetchDashboardDetails(corp_id);
        if (dashboardResponse.code === 1000) {
          setData(dashboardResponse.detail);
        } else {
          setError("Unexpected response code: " + dashboardResponse.code);
        }

        const transactionResponse = await fetchSubscriptionTransactions(
          corp_id
        );

        const successfulTransactions = transactionResponse.transactions.filter(
          (transaction) => transaction.payment_status === 1
        );

        if (successfulTransactions.length > 0) {
          const latestTransaction = successfulTransactions.sort(
            (a, b) => new Date(b.payment_date) - new Date(a.payment_date)
          )[0];
          setPlan(latestTransaction);
        } else {
          setPlan(null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [corp_id]);

  return (
    <>
      <div className="d-flex flex-column min-vh-100 position-relative">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container" style={{ position: "relative" }}>
            {/* Sidebar */}
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
                    <div data-i18n="Analytics">Dashboard</div>
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





                {/* <li>
                  <Link to={`/ChangePassword/${corp_id}`} className="menu-link mx-3 text-decoration-none">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />{" "}
                    <span className="mx-2 text-white">Change Password</span>
                  </Link>
                </li> 
 */}









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

            {/* Content Area */}
            <div className="layout-page bg-white">


            <div className="container h-15vh">
  <div className="row mt-3 align-items-center">
    <div className="col-lg-8">
      <h4 className="fw-bold text-primary">Dashboard</h4>
    </div>
    <div className="col-lg-4" >
      <div className="row justify-content-end">
        <div className="col-lg-6" style={{width:"250px"}}>
          <div className="border rounded-pill  d-flex align-items-center upDashboard">
            <img
              src="../d-user.svg"
              alt="d-user"
              className="img-fluid"
              width="50px"
            />
            <h6 className="ms-2 mb-0">
              <span className="text-primary lh-1">Welcome
              <br /> User TP </span>
              {/* Dropdown for options */}
              <div className="dropdown d-inline">
                <button
                  className="btn btn-link  "
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
                  {/* View Profile */}
                  <li>
                    <Link className="dropdown-item"  to={`/ViewProfile/${corp_id}`}>
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      View Profile
                    </Link>
                  </li>
                  {/* Change Password */}
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
                  {/* Logout */}
                  <li>
                    <a className="dropdown-item" href="#">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="me-2"
                        style={{ color: "grey" }}
                      />
                      Logout
                    </a>
                  </li>

                  
                </ul>
                <Link to="">
                              <FontAwesomeIcon icon={faSignOutAlt} style={{color: "grey", width: "25px", height: "15px",}}/>
                            </Link>
              </div> 
            </h6>


            
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




              {/* <div className="container h-15vh">
                <div className="row mt-3 align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Dashboard</h4>
                  </div>
                  <div className="col-lg-4">
                    <div className="row justify-content-end">
                      <div className="col-lg-6">
                        <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                          <img
                            src="../d-user.svg"
                            alt="d-user"
                            className="img-fluid"
                            width="50px"
                          />
                          <h6 className="ms-2 mb-0">
                            <span className="text-primary lh-1">Welcome</span>
                            <br /> User TP
                            <a href="">
                              <FontAwesomeIcon
                                icon={faSignOutAlt}
                                style={{
                                  color: "grey",
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
              </div> */}

              {loading && <p>Loading data...</p>}
              {error && <p className="text-danger">{error}</p>}

              {!loading && !error && (
                <div className="container mt-2">
                  {plan ? (
                    <div
                      className="card shadow-sm rounded"
                      style={{ background: "#F8F9FA", padding: "5px" }}
                    >
                      <h4 className="card-title text-center text-success mb-3">
                        Active Plan:{" "}
                        <span className="fw-bold text-primary">
                          {plan.plan_name}
                        </span>
                      </h4>
                      <div className="d-flex justify-content-between mb-1">
                        <div>
                          <h6 className="text-muted">Amount</h6>
                          <p className="fs-4 text-primary">₹{plan.amount}</p>
                        </div>
                        <div>
                          <h6 className="text-muted">Payment Date</h6>
                          <p className="fs-4 text-primary">
                            {new Date(plan.payment_date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <h6 className="text-muted">Status</h6>
                          <p className="fs-4 text-success">
                            {plan.payment_status === 1 ? "Success" : "Failed"}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/UpgradePlan/${corp_id}`}
                        className="btn btn-primary w-100 mt-1"
                      >
                        Upgrade Plan
                      </Link>
                    </div>
                  ) : (
                    <div className="alert alert-warning text-center p-4 shadow-sm rounded">
                      <h4 className="text-uppercase mb-3">
                        No Active Subscription Found
                      </h4>
                      <p className="fs-5">
                        Your current plan has expired, please upgrade.
                      </p>
                      <Link
                        to={`/UpgradePlan/${corp_id}`}
                        className="btn btn-primary"
                      >
                        Upgrade Now
                      </Link>
                    </div>
                  )}

                  <div className="row mt-3">
                    <div className="col-md-4 mb-4 rounded-lg">
                      <span
                        href="#"
                        className="card text-center card-light-blue"
                        style={{ background: "#4775d1", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="../batch.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Exam
                            </h5>
                          </div>
                          <div className="card-data text-start">
                            <span className="fs-2 text-white">{data.exam}</span>
                          </div>
                        </div>
                        <div className="mb-4 my-2">
                          <Link
                            to={`/ExamListPage/${corp_id}`}
                            className="btn btn-light border-secondary"
                          >
                            View Details
                          </Link>
                        </div>
                      </span>
                    </div>

                    <div className="col-md-4 mb-4">
                      <a
                        href="exams.html"
                        className="card text-center card-light-green text-decoration-none"
                        style={{ background: "#004d4d", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="../candidate.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Batch
                            </h5>
                          </div>
                          <div className="card-data text-start">
                            <span className="fs-2 text-white">
                              {data.batch}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4 my-2">
                          <Link
                            to={`/BatchlistPage/${corp_id}`}
                            className="btn btn-light border-secondary"
                          >
                            View Details
                          </Link>
                        </div>
                      </a>
                    </div>

                    <div className="col-md-4 mb-4">
                      <span
                        href="batches.html"
                        className="card text-center card-light-yellow"
                        style={{ background: "#d966ff", borderRadius: "22px" }}
                      >
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="flex-grow-1 text-start">
                            <img src="../exam.svg" alt="" />
                            <h5
                              className="card-title my-2 text-white fs-5"
                              style={{ width: "110px" }}
                            >
                              Student
                            </h5>
                          </div>
                          <div className="card-data text-start">
                            <span className="fs-2 text-white">
                              {data.student}
                            </span>
                          </div>
                        </div>
                        <div className="mb-4 my-2">
                          <Link
                            to={`/StudentlistPage/${corp_id}`}
                            className="btn btn-light border-secondary"
                          >
                            View Details
                          </Link>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div
                        className="card text-center"
                        style={{ background: "#936963" }}
                      >
                        <div
                          className="text-white mt-4"
                          style={{ background: "#936963" }}
                        >
                          Assessment Console
                        </div>
                        <br />
                        <div
                          className="card-body"
                          style={{ background: "#936963" }}
                        >
                          <button
                            type="submit"
                            className="btn btn-danger border-secondary text-bold p-2"
                            style={{
                              marginTop: "-27px",
                              background: "#1C4481",
                            }}
                          >
                            Assess Assessment Console
                          </button>
                          <p className="card-text mb-5 text-white">
                            Manage users, exams, and settings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
