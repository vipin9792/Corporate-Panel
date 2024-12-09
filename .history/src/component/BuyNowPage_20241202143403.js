import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";

const BuyNowPage = ({ bearerToken }) => {
    const { corp_id, id } = useParams(); // Get corp_id and id from route params
    const [planDetails, setPlanDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch plan details using corp_id and id
    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                // API call with the Bearer token in the Authorization header
                const response = await fetch(`http://103.35.121.219:4000/corp/subscription/fetchPlanDetails?corp_id=${corp_id}&id=${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${bearerToken}`, // Pass token as a prop here
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.status === "Response successful complete!!") {
                    setPlanDetails(data.plan);
                } else {
                    console.error("Failed to fetch plan details.");
                }
            } catch (error) {
                console.error("Error fetching plan details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanDetails();
    }, [corp_id, id, bearerToken]); // Include bearerToken in dependencies

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!planDetails) {
        return <div>Error loading plan details.</div>;
    }

    const handleBuyNow = () => {
        // Add functionality for Buy Now action
        console.log("Buy Now button clicked");
        // You could call an API here to proceed with the purchase, using bearerToken
    };

    return (
        <div className="d-flex flex-column min-vh-100 position-relative">
            <div className="layout-wrapper layout-content-navbar flex-grow-1">
                <div className="layout-container" style={{ position: "relative" }}>
                    {/* Sidebar */}
                    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: "100vh", zIndex: 1 }}>
                        <div className="app-brand demo" style={{ background: "#1C4481" }}>
                            <a href="index.html" className="app-brand-link">
                                <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
                            </a>
                            <Link to="/" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                                <i className="bx bx-chevron-left bx-sm align-middle"></i>
                            </Link>
                        </div>
                        <div className="menu-inner-shadow"></div>
                        <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
                            <li className="menu-item active">
                                <Link to="/dashboard" className="menu-link text-decoration-none">
                                    <img src="dashboard-active.svg" alt="" className="menu-icon tf-icons bx bx-home-circle" />
                                    <div data-i18n="Analytics">Dashboard</div>
                                </Link>
                            </li>
                            {/* Add additional menu items */}
                        </ul>
                    </aside>

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
                                        <img src="https://via.placeholder.com/500?text=Product+1" className="img-fluid" alt={planDetails.plan_name} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <p className="text-muted">Plan Name: {planDetails.plan_name}</p>
                                    <div className="rating mb-3">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <FontAwesomeIcon key={index} icon={index < 4 ? solidStar : regularStar} />
                                        ))} ({planDetails.no_of_exam} Reviews)
                                    </div>
                                    <h4 className="text-success">${planDetails.total_cost}</h4>
                                    <p className="mt-3">This is the {planDetails.plan_name} plan, which includes all the necessary features for your exam preparation.</p>

                                    <div className="mt-4">
                                        <label htmlFor="colorSelect" className="form-label">Study Materials:</label>
                                        <select className="form-select" id="colorSelect">
                                            {/* Add logic to populate this list from the plan's features */}
                                            {planDetails.features.map((feature) => (
                                                <option key={feature.id_subscription} value={feature.subscription_name}>{feature.subscription_display_name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="quantity" className="form-label">Quantity:</label>
                                        <input type="number" className="form-control" id="quantity" defaultValue="1" min="1" />
                                    </div>

                                    <div className="mt-4">
                                        <button className="btn btn-primary btn-lg" onClick={handleBuyNow}>Buy Now</button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h4>Description</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
                                <h5>Features:</h5>
                                <ul>
                                    {planDetails.features.map((feature) => (
                                        <li key={feature.id_subscription}>{feature.subscription_display_name}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-5">
                                <h4>Related Plans</h4>
                                <div className="row">
                                    {["Plan 1", "Plan 2", "Plan 3", "Plan 4"].map((plan, index) => (
                                        <div className="col-md-3" key={index}>
                                            <div className="card mb-4">
                                                <img src={`https://via.placeholder.com/500?text=${plan}`} className="card-img-top" alt={plan} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{plan}</h5>
                                                    <p className="card-text">$49.99</p>
                                                    <a href="#" className="btn btn-primary">View</a>
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
