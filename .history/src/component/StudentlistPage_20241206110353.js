import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer"; // Import Footer component

const StudentListPage = () => {
  const { corp_id } = useParams();  // Get corp_id from the URL params
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Number of students per page

  // Fetch students data when the component is mounted or when corp_id changes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("Fetching students for corp_id:", corp_id);
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/studentList",
          { corp_id },
          {
            headers: {
              Authorization: "Bearer YOUR_API_TOKEN_HERE", // Replace with actual token
            },
          }
        );

        console.log("API Response Data:", response.data);

        if (response.data.code === 1000) {
          setStudents(response.data.students);
        } else {
          setError("Unexpected response code: " + response.data.code);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Error fetching students: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [corp_id]);

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="d-flex flex-column min-vh-100">
        <div className="layout-wrapper layout-content-navbar flex-grow-1">
          <div className="layout-container">
            {/* Content Area */}
            <div className="layout-page bg-white">
              <div className="container mt-3">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Student List</h4>
                  </div>
                </div>
              </div>

              {/* Student Table */}
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
                            <td>{index + 1 + (currentPage - 1) * studentsPerPage}</td>
                            <td>{student.student_name}</td>
                            <td>{student.student_email}</td>
                            <td>{student.student_mobile}</td>
                            <td>{student.enrollment_number}</td>
                            <td>
                              <img
                                src={student.upload_student_picture}
                                alt={student.student_name}
                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                              />
                            </td>
                            <td>{student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : "N/A"}</td>
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

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-3">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Pre
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map((num) => (
                        <li
                          key={num}
                          className={`page-item ${currentPage === num + 1 ? "active" : ""}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(num + 1)}
                          >
                            {num + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentListPage;
