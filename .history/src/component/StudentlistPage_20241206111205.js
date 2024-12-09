import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer"; // Assuming Footer component is already created.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const StudentlistPage = () => {
  const { corp_id } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/studentList",
          { corp_id: corp_id },
          {
            headers: {
              Authorization:
                "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        if (response.data.code === 1000) {
          setStudents(response.data.students);
        } else {
          setError("Unexpected response code: " + response.data.code);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Error fetching student data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentList();
  }, [corp_id]);

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        <div className="layout-container" style={{ position: "relative" }}>
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-primary"
            style={{ height: "100vh", zIndex: 1 }}
          >
            {/* Sidebar structure */}
            <div className="app-brand demo" style={{ background: "#1C4481" }}>
              <a href="index.html" className="app-brand-link">
                <img
                  src="../logo1.png"
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
              {/* Other menu items */}
              <li>
                <Link to="/" className="menu-link mx-3 text-decoration-none">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="1x"
                    style={{ color: "white" }}
                  />
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
                  <h4 className="fw-bold text-primary">Student List</h4>
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
                          <span className="text-primary lh-1">Welcome</span> User TP
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

            {loading && <p>Loading student data...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
              <div className="container mt-1">
                <div className="row">
                  {students.map((student) => (
                    <div className="col-md-4 mb-4" key={student.id}>
                      <div className="card text-center">
                        <img
                          src={student.upload_student_picture}
                          alt="Student"
                          className="card-img-top"
                          style={{ borderRadius: "10px", height: "200px" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{student.student_name}</h5>
                          <p className="card-text">{student.student_email}</p>
                          <p className="card-text">{student.student_mobile}</p>
                          <Link
                            to={`/StudentDetail/${student.id}`}
                            className="btn btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentlistPage;
