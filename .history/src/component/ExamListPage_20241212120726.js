import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

import { fetchExams } from "../Api Folder/ExamListPageApi";
import Footer from "./Footer";

const ExamListPage = () => {
  const { corp_id } = useParams();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [examsPerPage] = useState(15);

  useEffect(() => {
    const getExamsData = async () => {
      try {
        console.log("Fetching exams for corp_id:", corp_id);
        const data = await fetchExams(corp_id);

        if (data.code === 1000) {
          setExams(data.exams);
        } else {
          setError("Unexpected response code: " + data.code);
        }
      } catch (err) {
        console.error("Error fetching exams:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getExamsData();
  }, [corp_id]);

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);

  const totalPages = Math.ceil(exams.length / examsPerPage);

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
           <Navbar/>
            {/* Content Area */}
            <div className="layout-page bg-white">
             
            </div>
          </div>
         
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ExamListPage;
