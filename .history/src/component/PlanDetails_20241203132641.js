import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  const { corp_id, id_plan } = useParams(); 
  const navigate = useNavigate(); 
  const [planData, setPlanData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const [showFullDescription, setShowFullDescription] = useState(false); // State for toggling description

  const BEARER_TOKEN =
    "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Use the Bearer Token here

  useEffect(() => {
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

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState); // Toggle the state
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      {/* Existing JSX Content */}

      {/* Description and Features Section */}
      <section className="bg-light ">
        <Container>
          <div className="list-unstyled">
            <span
              className="fw-b text-success"
              style={{
                fontSize: "26px",
                marginLeft: "182px",
                marginTop: "92px",
              }}
            >
              Features:
            </span>
            {planData && planData.features ? (
              planData.features.map((feature) => (
                <p
                  key={feature.id_subscription}
                  style={{
                    fontSize: "16px",
                    marginLeft: "192px",
                    marginTop: "12px",
                  }}
                >
                  {feature.subscription_display_name}
                </p>
              ))
            ) : (
              <li>No features available.</li>
            )}
          </div>

          {/* Aadhaar Validation Description */}
          <div className="mt-4" style={{ marginLeft: "182px" }}>
            <h5 className="text-primary">Aadhaar Validation</h5>
            <p style={{ fontSize: "16px" }}>
              {showFullDescription
                ? "This feature allows you to validate your Aadhaar details via OTP. You will receive an OTP on the registered mobile number, which you can use to complete the validation process. This ensures that your Aadhaar details are verified before proceeding with the subscription."
                : "This feature allows you to validate your Aadhaar details via OTP. Click below to read more..."}
            </p>
            <Button
              variant="link"
              onClick={toggleDescription}
              style={{ padding: "0", textDecoration: "underline" }}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </Button>
          </div>
        </Container>
      </section>

      <br />
      <br />
      <br />
    </div>
  );
};

export default PlanDetails;