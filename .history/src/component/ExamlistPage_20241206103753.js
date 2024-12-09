





import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";  // Import Footer component
import Navbar from "./Navbar";

const ExamListPage = () => {
  const { corp_id } = useParams();  // Get corp_id from the URL params
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [batchesPerPage] = useState(5); // Number of batches per page

  // Fetch batches data when the component is mounted or when corp_id changes
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        console.log("Fetching batches for corp_id:", corp_id);
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/dashboard/batchList",
          { corp_id },
          {
            headers: {
              Authorization: "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz", // Replace with actual token
            },
          }
        );

        console.log("API Response Data:", response.data);

        if (response.data.code === 1000) {
          setBatches(response.data.batches);
        } else {
          setError("Unexpected response code: " + response.data.code);
        }
      } catch (err) {
        console.error("Error fetching batches:", err);
        setError("Error fetching batches: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [corp_id]);

  // Pagination Logic
  const indexOfLastBatch = currentPage * batchesPerPage;
  const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
  const currentBatches = batches.slice(indexOfFirstBatch, indexOfLastBatch);

  const totalPages = Math.ceil(batches.length / batchesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    
    <Navbar/>

    <div className="container" style={{position:"absolute",top:"12%",left:""}}>
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

              {/* Batch Table */}
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
                            <td>{index + 1 + (currentPage - 1) * batchesPerPage}</td>
                            <td>{batch.batch_name}</td>
                            <td>{new Date(batch.date_assessment).toLocaleDateString()}</td>
                            <td>{new Date(batch.actual_date_assessment).toLocaleDateString()}</td>
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
                <div className="d-flex justify-content-center mt-3">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                          Pre
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map((num) => (
                        <li key={num} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
                          <button className="page-link" onClick={() => handlePageChange(num + 1)}>
                            {num + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
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
  
  
    </div>
    <Footer style={{position:"absolute",top:"12%",left:"20%"}}/>
    </>
  );
};
export default ExamListPage;






















// import React from 'react'
// import Footer from './Footer'
// import Navbar from './Navbar'
// const ExamlistPage = () => {
//   return (
//     <div>
//      <Navbar/>
//      <section style={{position:"absolute",top:"12%",left:"20%"}}>
//         <p>Lorem</p>


//      <h1>erfgs</h1>

//      </section>
//      <Footer/>
//     </div>
//   )
// }

// export default ExamlistPage
