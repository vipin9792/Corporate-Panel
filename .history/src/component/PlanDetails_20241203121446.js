import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const PlanDetails = () => {
  const { corp_id, id_plan } = useParams();  // Retrieve params for corp_id and id_plan from URL
  const navigate = useNavigate();  // This replaces useHistory
  const [planData, setPlanData] = useState(null);  // Holds plan data fetched from API
  const [loading, setLoading] = useState(false);  // State to track loading
  const [error, setError] = useState(null);  // Error handling state

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Use the Bearer Token here

  useEffect(() => {
    // Fetch plan details based on corp_id and id_plan from URL params
    const fetchPlanDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchPlanDetails",
          { corp_id, id_plan },
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.code === 1000) {
          setPlanData(response.data.plan);
        } else {
          setError(response.data.status || "Unknown error");
        }
      } catch (err) {
        setError("An error occurred while fetching the plan details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (corp_id && id_plan) {
      fetchPlanDetails();
    }
  }, [corp_id, id_plan]);

 

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  
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
                    src="logo1.png"
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
                    to="/"
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
                        <a
                          href="#tr"
                          className="text-white text-decoration-none"
                        >
                          <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo
                          Update
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
                    <span className="mx-2 text-white"> Plan</span>
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

            {/* Content Area */}
            <div className="layout-page bg-white">
              <div className="container h-15vh">
                <div className="row mt-3 align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Buy Now</h4>
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
                            <span className="text-primary lh-1">Welcome</span>{" "}
                            <br /> User TP
                            <FontAwesomeIcon
                              icon={faUserCircle}
                              style={{ color: "grey" }}
                            />
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
              </div>
			  
			  
			  
			  
			    {/* Hero Section */}
      <section className="hero bg-primary text-white text-center py-5">
        <Container>
          <h1>Get Ready for Your Plan</h1>
          <p>Subscribe to the best online exam platform. Choose a plan that fits your needs!</p>
        </Container>
      </section>

      {/* Subscription Plan Section */}
      <section id="plans"><br /><br /><br />
        <Container>
         
          <Row className="justify-content-center">
            {/* Single Plan (Standard Plan) */}
            <Col md={8}>
              <Card className="shadow-sm mb-4 rounded-3">
                <Card.Body className="text-center">
                  <Card.Title className="fs-1">
   
                  <p> {planData ? planData.plan_name : "0"}</p>




                  </Card.Title>







                  <p className="plan-price fs-2 fw-bold text-success">
                    ${planData ? planData.total_cost : "39.99"} / Month
                  </p>
                  <p><strong>Discount:</strong> {planData ? planData.discount : "0"}%</p>
                  <p><strong>Storage:</strong> {planData ? planData.total_storage : "20"} GB</p>
                  <p><strong>Number of Exams:</strong> {planData ? planData.no_of_exam : "10"}</p>
                
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Description and Features Section */}
      <section className="bg-light ">
        <Container>
          
          <div className="list-unstyled"><span className="fw-b text-success" style={{fontSize:"19px",marginLeft:"152px",marginTop:"92px"}}>Features:</span>
            {planData && planData.features ? (
              planData.features.map((feature) => (
                <p key={feature.id_subscription}   style={{fontSize:"16px",marginLeft:"152px"}}>
                 {feature.subscription_display_name}
                </p>
              ))
            ) : (
              <li>No features available.</li>
            )}
          </div>
        </Container>
      </section>
			  
			  
			  
			  

            
               
			
			
			
      </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PlanDetails;
