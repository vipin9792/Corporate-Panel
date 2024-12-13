import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchStudents } from "../Api Folder/StudentPageApi"; 
import Footer from "./Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const StudentlistPage = () => {
  const { corp_id } = useParams(); 
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(15); 

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching students for corp_id:", corp_id);
        const data = await fetchStudents(corp_id); 
        console.log("API Response Data:", data);

        if (data.code === 1000) {
          setStudents(data.students);
        } else {
          setError("Unexpected response code: " + data.code);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Error fetching students: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [corp_id]);


  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);


  const paginationWindow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(paginationWindow / 2));
  const endPage = Math.min(totalPages, startPage + paginationWindow - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                    src="../logo1.png" style={{ mixBlendMode: "luminosity",opacity:"0.8"}}
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
                  <Link to={`/Dashboard/${corp_id}`} className="menu-link text-decoration-none">
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
                        <Link to={`/ViewProfile/${corp_id}`} className="text-white text-decoration-none">
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
                  <Link to={`/UpgradePlan/${corp_id}`} className="menu-link text-decoration-none">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      size="1x"
                      style={{ color: "white" }}
                    />
                    <span className="mx-2 text-white"> Plan</span>
                  </Link>
                </li>

                <li className="menu-item">
                  <Link to={`/TransectionPage/${corp_id}`} className="menu-link text-decoration-none">
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
                            <span className="text-primary lh-1">Welcome</span>{" "}
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

                {/* Main content */}
                <div className="container mt-3">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Student Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Enrollment Number</th>
                          <th>Picture</th>
                          <th>Date of Birth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="7">Loading...</td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan="7" className="text-center text-danger">
                              {error}
                            </td>
                          </tr>
                        ) : students.length > 0 ? (
                          currentStudents.map((student, index) => (
                            <tr key={student.id}>
                              <td>
                                {index + 1 + (currentPage - 1) * studentsPerPage}
                              </td>
                              <td>{student.student_name}</td>
                              <td>{student.student_email}</td>
                              <td>{student.student_mobile}</td>
                              <td>{student.enrollment_number}</td>
                              <td>
                                <img
                                  src={student.upload_student_picture}
                                  alt={student.student_name}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </td>
                              <td>
                                {student.date_of_birth
                                  ? new Date(
                                      student.date_of_birth
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No students found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

              
                  <div className="d-flex justify-content-center mt-3" style={{marginBottom:"70px"}}>
                    <nav>
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Pre
                          </button>
                        </li>
                        {pageNumbers.map((num) => (
                          <li
                            key={num}
                            className={`page-item ${
                              currentPage === num ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(num)}
                            >
                              {num}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default StudentlistPage;
