import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";  // Import Footer component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUserCircle,
  faSignOutAlt,
  faCalendarAlt,
  faUserEdit,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

const DashboardPage = () => {
  const { corp_id } = useParams();
  const [activePlan, setActivePlan] = useState(null);  // State to store the active plan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        // Make an API call to fetch the active plan
        const response = await axios.post(
          "http://103.35.121.219:4000/corp/subscription/fetchTransactions",  // API to get the active plan details (same endpoint for transactions)
          { corp_id: corp_id },
          {
            headers: {
              Authorization:
                "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz",
            },
          }
        );

        console.log("API Response Data:", response.data);

        // Check if the API response contains transactions
        if (response.data.code === 1000 && response.data.transactions.length > 0) {
          // Assume the active plan is the most recent transaction
          const activeTransaction = response.data.transactions[0]; // Assuming the latest transaction has the active plan
          setActivePlan(activeTransaction);  // Set the active plan to state
        } else {
          setError("No active plan found");
        }
      } catch (err) {
        console.error("Error fetching active plan:", err);
        setError("Error fetching active plan: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlan();
  }, [corp_id]);

  const planImages = {
    Platinum: "/images/platinum.svg",
    Gold: "/images/gold.svg",
    Silver: "/images/silver.svg",
    Bronze: "/images/bronze.svg",
    Basic: "/images/basic.svg",
  };

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        <div className="layout-container" style={{ position: "relative" }}>
          {/* Sidebar */}
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-primary"
            style={{ height: "100vh", zIndex: 1 }}
          >
            {/* Sidebar content */}
            {/* Add your sidebar code here */}
          </aside>

          {/* Content Area */}
          <div className="layout-page bg-white">
            <div className="container h-15vh">
              <div className="row mt-3 align-items-center">
                <div className="col-lg-8">
                  <h4 className="fw-bold text-primary">Dashboard</h4>
                </div>
              </div>
            </div>

            {/* Active Plan Display */}
            <div className="container mt-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      {loading ? (
                        <p>Loading...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : activePlan ? (
                        <>
                          <h5>{activePlan.plan_name} Plan</h5>
                          <img
                            src={planImages[activePlan.plan_name] || "/images/default.svg"}
                            alt={activePlan.plan_name}
                            style={{ width: "100px", height: "auto" }}
                          />
                          <p>Amount: ₹{activePlan.amount}</p>
                          <p>Status: {activePlan.payment_status === -1 ? "Pending" : "Active"}</p>
                        </>
                      ) : (
                        <p>No active plan found for this user.</p>
                      )}
                    </div>
                  </div>
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

export default DashboardPage;
