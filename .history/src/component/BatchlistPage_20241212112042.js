import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import  { fetchBatches } from "../Api Folder/BatchlistApi"; 
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const BatchlistPage = () => {
  const { corp_id } = useParams(); 
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [batchesPerPage] = useState(15); 

  
  useEffect(() => {
    const fetchBatchesData = async () => {
      try {
        setLoading(true);
        const data = await fetchBatches(corp_id); 
        if (data.code === 1000) {
          setBatches(data.batches);
        } else {
          setError("Unexpected response code: " + data.code);
        }
      } catch (err) {
        console.error("Error fetching batches:", err);
        setError("Error fetching batches: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchesData();
  }, [corp_id]);

 
  const indexOfLastBatch = currentPage * batchesPerPage;
  const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
  const currentBatches = batches.slice(indexOfFirstBatch, indexOfLastBatch);

  const totalPages = Math.ceil(batches.length / batchesPerPage);


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
            {/* Sidebar code here... */}

          Navb

            {/* Content Area */}
            {/* Content Area */}
            <div className="layout-page bg-white">
              <div className="container h-15vh">
                <div className="row mt-3 align-items-center">
                  <div className="col-lg-8">
                    <h4 className="fw-bold text-primary">Batch List</h4>
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
                          <th>Batch Name</th>
                          <th>Date of Assessment</th>
                          <th>Actual Date of Assessment</th>
                          <th>Address</th>
                          <th>Total Students</th>
                          <th>Centre</th>
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
                        ) : batches.length > 0 ? (
                          currentBatches.map((batch, index) => (
                            <tr key={batch.id}>
                              <td>
                                {index + 1 + (currentPage - 1) * batchesPerPage}
                              </td>
                              <td>{batch.batch_name}</td>
                              <td>
                                {new Date(
                                  batch.date_assessment
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {new Date(
                                  batch.actual_date_assessment
                                ).toLocaleDateString()}
                              </td>
                              <td>{batch.address}</td>
                              <td>{batch.total_student}</td>
                              <td>{batch.centre_id}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No batches found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
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
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchlistPage;
