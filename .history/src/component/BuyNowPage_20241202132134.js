import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle, faSignOutAlt, faCalendarAlt, faUserEdit, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "./Footer";


const BuyNowPage = () => {

   
    return (
        <div className="d-flex flex-column min-vh-100 position-relative">
            <div className="layout-wrapper layout-content-navbar flex-grow-1">
                <div className="layout-container" style={{ position: "relative" }}>
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
                            <br />
                            <li>
                                <Link data-bs-toggle="collapse" data-bs-target="#collapseProfile" aria-expanded="false" aria-controls="collapseProfile" className="d-flex cursor-pointer text-decoration-none">
                                    <FontAwesomeIcon icon={faUserCircle} size="2x" className="mx-2" style={{ color: "white" }} />
                                    <span className="text-white mt-1">Profile <img src="down-arrow.png" alt="" width="30px" height="20px" /></span>
                                </Link>
                                <div className="collapse" id="collapseProfile">
                                    <ul>
                                        <li className="menu-item mt-2">
                                            <Link to="/ViewProfile" className="text-white text-decoration-none">
                                                <FontAwesomeIcon icon={faUserEdit} size="1x" /> View Profile
                                            </Link>
                                        </li>
                                        <li className="menu-item my-2">
                                            <a href="#tr" className="text-white text-decoration-none">
                                                <FontAwesomeIcon icon={faCoffee} size="1x" /> Logo Update
                                            </a>
                                        </li>
                                        <br />
                                    </ul>
                                </div>
                            </li>
                            <li className="menu-item">
                                <Link to="/" className="menu-link text-decoration-none">
                                    <FontAwesomeIcon icon={faCalendarAlt} size="1x" style={{ color: "white" }} /><span className="mx-2 text-white"> Plan</span>
                                </Link>
                            </li>
                            <li>
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
                                    <p className="text-muted">Exam Name: [Exam Name]</p>
                                    <div className="rating mb-3">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <FontAwesomeIcon key={index} icon={index < 4 ? solidStar : regularStar} />
                                        ))} (120 Reviews)
                                    </div>
                                    <h4 className="text-success">$99.99</h4>
                                    <p className="mt-3">Discover the features of this amazing product that brings you closer to what you love!</p>

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
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
                                <h5>Features:</h5>
                                <ul>
                                    <li>Practice Tests: [Practice tests ki details]</li>
                                    <li>Performance Analysis: Aapko har test ke baad detailed performance report milegi.</li>
                                    <li>Study Materials: Integer molestie lorem at massa</li>
                                </ul>
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
            {/* <footer className="footer bg-primary text-white text-center p-3" style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #fff" }}>
                <div className="container-fluid">
                    <p className="mb-0">© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
                </div>
            </footer> */}
            <Footer/>
        </div>
    );
};

export default BuyNowPage;
