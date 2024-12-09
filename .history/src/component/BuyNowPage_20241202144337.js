import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";

const BuyNowPage = () => {
    // State to store plan details and loading state
    const [planDetails, setPlanDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Extract corp_id and plan_id from URL params
    const { corp_id, plan_id } = useParams();

    useEffect(() => {
        // Fetch plan details using corp_id and plan_id
        const fetchPlanDetails = async () => {
            try {
                const response = await axios.post(
                    "http://103.35.121.219:4000/corp/subscription/fetchPlanDetails",
                    { corp_id, plan_id },
                    { headers: { Authorization: `Bearer YOUR_TOKEN_HERE` } }
                );
                if (response.data.status === "Response successful complete!!") {
                    setPlanDetails(response.data.plan);  // Set the plan details in state
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch plan details");
                setLoading(false);
            }
        };

        fetchPlanDetails();
    }, [corp_id, plan_id]);

    // If loading or error, show a loading or error message
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="d-flex flex-column min-vh-100 position-relative">
            <div className="layout-wrapper layout-content-navbar flex-grow-1">
                <div className="layout-container" style={{ position: "relative" }}>
                    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary" style={{ height: "100vh", zIndex: 1 }}>
                        <div className="app-brand demo" style={{ background: "#1C4481" }}>
                            <a href="index.html" className="app-brand-link">
                                <img src="logo1.png" alt="dashboard-active" className="img-fluid" />
                            </a>
                        </div>
                        <div className="menu-inner-shadow"></div>
                        <ul className="menu-inner py-1 demo" style={{ background: "#1C4481" }}>
                            <li className="menu-item active">
                                <Link to="/dashboard" className="menu-link text-decoration-none">
                                    <div data-i18n="Analytics">Dashboard</div>
                                </Link>
                            </li>
                            <br />
                            <li>
                                <Link to="/ViewProfile" className="text-white text-decoration-none">
                                    View Profile
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/" className="menu-link mx-3 text-decoration-none">
                                    <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ color: "white" }} /> <span className="mx-2 text-white">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </aside>

                    <div className="layout-page bg-white flex-grow-1" style={{ paddingBottom: "60px" }}>
                        <div className="container h-15vh">
                            <div className="row mt-3 align-items-center">
                                <div className="col-lg-8">
                                    <h4 className="fw-bold text-primary">Choose & Buy Now</h4>
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
                                            <FontAwesomeIcon key={index} icon={index < 4 ? solidStar : regularStar} />
                                        ))} (120 Reviews)
                                    </div>
                                    <h4 className="text-success">${planDetails.total_cost}</h4>
                                    <p className="mt-3">Discover the features of this amazing plan that brings you closer to your goals!</p>

                                    <div className="mt-4">
                                        <label htmlFor="colorSelect" className="form-label">Study Materials:</label>
                                        <select className="form-select" id="colorSelect">
                                            <option value="Red">Electronics Books</option>
                                            <option value="Blue">Mechanical Books</option>
                                            <option value="Green">Computer Programming</option>
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="quantity" className="form-label">Quantity:</label>
                                        <input type="number" className="form-control" id="quantity" defaultValue="1" min="1" />
                                    </div>

                                    <div className="mt-4">
                                        <button className="btn btn-primary btn-lg">Subscription Plan</button>
                                        <button className="btn btn-success btn-lg ms-2">Buy Now</button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <h4>Description</h4>
                                <p>{planDetails.features.map((feature, index) => (
                                    <li key={index}>{feature.subscription_display_name}</li>
                                ))}</p>
                            </div>

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

            {/* Full-Width Footer */}
            <Footer/>
        </div>
    );
};

export default BuyNowPage;
