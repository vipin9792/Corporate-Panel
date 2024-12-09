import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'; // For making API calls
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const BuyNowPage = () => {
  const { corp_id, id_plan } = useParams(); // Extract parameters from URL
  const [planDetails, setPlanDetails] = useState(null); // Store plan details from API
  const bearerToken = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"; // Your Bearer token

  // Fetch plan details for buying
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.post(`http://103.35.121.219:4000/corp/subscription/fetchPlanDetails?corp_d=${corp_id}&plan_id=${id_plan}`, {
          headers: {
            Authorization: `Bearer ${bearerToken}` // Include Bearer Token in the request headers
          }
        });
        setPlanDetails(response.data.plan); // Update state with fetched plan details
      } catch (error) {
        console.error("Error fetching plan details:", error);
      }
    };

    if (corp_id && id_plan) {
      fetchPlanDetails();
    }
  }, [corp_id, id_plan]);

  if (!planDetails) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <div className="layout-wrapper layout-content-navbar flex-grow-1">
        <div className="layout-container" style={{ position: "relative" }}>
          {/* Your Sidebar or Header code goes here */}
          
          <div className="layout-page bg-white flex-grow-1" style={{ paddingBottom: "60px" }}>
            <div className="container h-15vh">
              <div className="row mt-3 align-items-center">
                <div className="col-lg-8">
                  <h4 className="fw-bold text-primary">Buy Now</h4>
                </div>
                <div className="col-lg-4">
                  <div className="row justify-content-end">
                    <div className="col-lg-6">
                      <div className="border rounded-pill p-1 d-flex align-items-center">
                        <img src="d-user.svg" alt="d-user" className="img-fluid" width="50px" />
                        <h6 className="ms-2 mb-0">
                          <span className="text-primary lh-1">Welcome</span><br /> User TP
                          <a href="">
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "grey", marginLeft: "10px" }} />
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="product-card rounded overflow-hidden shadow-sm">
                    <img src="https://via.placeholder.com/500?text=Product+1" className="img-fluid" alt="Amazing Product Name" />
                  </div>
                </div>

                <div className="col-md-6">
                  <p className="text-muted">Plan Name: {planDetails.plan_name}</p>
                  <div className="rating mb-3">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FontAwesomeIcon key={index} icon={index < 4 ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
                    ))} (120 Reviews)
                  </div>
                  <h4 className="text-success">${planDetails.total_cost}</h4>
                  <p className="mt-3">Buy this plan now and enjoy exclusive features!</p>

                  <div className="mt-4">
                    <label htmlFor="paymentMethod" className="form-label">Choose Payment Method:</label>
                    <select className="form-select" id="paymentMethod">
                      <option value="creditCard">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bankTransfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <button className="btn btn-primary btn-lg">Buy Now</button>
                    <button className="btn btn-success btn-lg ms-2">Cancel</button>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h4>Description</h4>
                <p>{planDetails.plan_name} - Plan description goes here.</p>
                <h5>Features:</h5>
                <ul>
                  {planDetails.features.map((feature) => (
                    <li key={feature.id_subscription}>{feature.subscription_display_name}</li>
                  ))}
                </ul>
              </div>

              {/* Related Products section */}
              <div className="mt-5">
                <h4>Related Products</h4>
                <div className="row">
                  {["Product 1", "Product 2", "Product 3", "Product 4"].map((product, index) => (
                    <div className="col-md-3" key={index}>
                      <div className="card mb-4">
                        <img src={`https://via.placeholder.com/500?text=${product}`} className="card-img-top" alt={product} />
                        <div className="card-body">
                          <h5 className="card-title">{product}</h5>
                          <p className="card-text">$49.99</p>
                          <button className="btn btn-primary">View</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyNowPage;
