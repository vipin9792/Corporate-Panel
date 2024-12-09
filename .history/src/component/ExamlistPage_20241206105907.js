import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer"; // Import Footer component

const ExamListPage = () => {
  const { corp_id } = useParams();  // Get corp_id from the URL params
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [examsPerPage] = useState(5); // Number of exams per page

  // Fetch exams data when the component is mounted or when corp_id changes
  useEffect(() => {
    const fetchExams = async () => {
      try {
        console.log("Fetching exams for corp_id:", corp_id);
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/examList",
          { corp_id },
          {
            headers: {
              Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz", // Replace with actual token
            },
          }
        );

        console.log("API Response Data:", response.data);

        if (response.data.code === 1000) {
          setExams(response.data.exams);
        } else {
          setError("Unexpected response code: " + response.data.code);
        }
      } catch (err) {
        console.error("Error fetching exams:", err);
        setError("Error fetching exams: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [corp_id]);

  // Pagination Logic
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);

  const totalPages = Math.ceil(exams.length / examsPerPage);

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
                    <h4 className="fw-bold text-primary">Exam List</h4>
                  </div>
                </div>
              </div>

              {/* Exam Table */}
              <div className="container mt-3">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Exam Name</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                        <th>Duration (mins)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="5" className="text-center text-danger">
                            {error}
                          </td>
                        </tr>
                      ) : exams.length > 0 ? (
                        currentExams.map((exam, index) => (
                          <tr key={exam.id}>
                            <td>{index + 1 + (currentPage - 1) * examsPerPage}</td>
                            <td>{exam.exam_name}</td>
                            <td>{new Date(exam.start_date).toLocaleDateString()}</td>
                            <td>{exam.start_time}</td>
                            <td>{exam.duration}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No exams found.
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

export default ExamListPage;
