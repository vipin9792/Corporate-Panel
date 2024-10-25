import React from 'react'

const UPcoming = () => {
  return (
    <div>
        
    <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
           
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-primary">
                <div className="app-brand demo">
                    <a href="index.html" className="app-brand-link">
                        <img src="logo.svg" alt="dashboard-active" className="img-fluid"/>
                    </a>

                    <a href="javascript:void(0);"
                        className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div className="menu-inner-shadow"></div>
                <ul className="menu-inner py-1">
                    
                    <li className="menu-item ">
                        <a href="dashboard.html" className="menu-link">
                            <img src="dashboard-inactive.svg" alt=""
                                className="menu-icon tf-icons bx bx-home-circle"/>
                            <div data-i18n="Analytics" className='text-white'>Dashboard</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="personal-profile.html" className="menu-link">
                            <img src="profile-inactive.svg" alt=""
                                className="menu-icon tf-icons bx bx-home-circle"/>
                            <div data-i18n="Analytics" className='text-white'>Profile</div>
                        </a>
                    </li>



                    <li className="menu-item">
                <a
                  class="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <img
                    src="hackathon-inactive.svg"
                    className="menu-icon tf-icons bx bx-layout "
                  />{" "}
                  <span className="text-white">HackaThon Status</span>
                </a>

                <div class="collapse" id="collapseExample">
                  <ul>
                    <li className="menu-item">
                      <a href="#dfs" className="">
                        <img src="upcoming-hackathon.svg" />
                        &nbsp;&nbsp; Upcoming Hackathon
                      </a>
                    </li>
                    <br />

                    <li className="menu-item">
                      <a href="#tr" className="">
                        <img src="completed-hackathon.svg" />
                        &nbsp;&nbsp; Completed Hackathon
                      </a>
                    </li>
                    <br />

                    <li className="menu-item">
                      <a href="#fsdf" className="">
                        <img src="pending-hackathon.svg" />
                        &nbsp;&nbsp; Pending Hackathon
                      </a>
                    </li>
                    <br />

                    <li className="menu-item">
                      <a href="#fs" className="">
                        <img src="rejected-hackathon.svg" />
                        &nbsp;&nbsp; Rejected Hackathon
                      </a>
                    </li>
                  </ul>
                </div>
              </li>


                    
              <li className="menu-item">
                        <a href="index.html" className="menu-link">
                            <img src="logout.svg" alt="" className="menu-icon tf-icons bx bx-home-circle"/>
                            <div data-i18n="Analytics" className='text-white'>Sectors</div>
                        </a>
                    </li>




                    

                    <li className="menu-item">
                        <a href="index.html" className="menu-link">
                            <img src="logout.svg" alt="" className="menu-icon tf-icons bx bx-home-circle"/>
                            <div data-i18n="Analytics" className='text-white'>Logout</div>
                        </a>
                    </li>
                </ul>
                {/* <div className="navbannerad">
                    <img src="web-banner-ad.svg" alt="web-banner-ad" className="img-fluid"/>
                </div> */}
            </aside>
           
          
            <div className="layout-page bg-white h-100vh">
               
                <div className="container">
                    <div className="row mt-3 align-items-center">
                        <div className="col-lg-8">
                            <h4 className=" fw-bold text-primary">Dashborad/Corporate Profile</h4>
                        </div>
                        <div className="col-lg-4">
                            <div className="row justify-content-end">
                                <div className="col-lg-6">
                                    <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                                        <img src="d-user.svg" alt="d-user" className="img-fluid" width="50px"/>
                                        <h6 className="ms-2 mb-0"><span className="text-primary">Welcome</span> <br/> User TP
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="container-fluid  h-85vh">
                   
                    <div className="content-wrapper h-100">
                      
                        <div className="skyblue mt-2 position-relative p-3 rounded h-100">
                            <div className="row h-100">
                                <div className="col-lg-12 h-100">
                                    <div className="overflow-y-scroll  hackthonProfile pe-3 h-100">
                                        <div className="bg-white shadow rounded mb-3 ">
                                            <div className="row border-bottom  p-3 align-items-center">
                                                <div className="col-lg-8">
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <img src="hack-thumbnail.svg"
                                                                alt="hack-thumbnail" className="img-fluid"/>
                                                        </div>
                                                        <div className="col-lg-8 text-primary ">
                                                            <h4 className="fw-bold">Fresher UI/UX designer</h4>
                                                            <h5 className="fw-bold">UI/UX Designer </h5>
                                                            <h6 className="text-secondary">Level - Easy</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <a href="#btn" className="btn btn-primary rounded-pill px-5 mx-auto w-max d-block"
                                                        href="#">Free</a>
                                                </div>
                                            </div>
                                            <div className="row p-4 align-items-start">
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="date-and-time.svg"
                                                                alt="q-pack" className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Date & Time</h4>
                                                            <p className="small mb-0">12-07-2023 | 12:30 PM
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="sector.svg" alt="q-code"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Sector</h4>
                                                            <p className="small mb-0">Easy
                                                                IT Sector</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="location.svg" alt="q-pack"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Location</h4>
                                                            <p className="small mb-0">Easy
                                                                Noida, Uttar Pradesh
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="level-easy.svg" alt="q-pack"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Level</h4>
                                                            <p className="small mb-0">Easy
                                                                Easy
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-hackathon-yellow-gradient shadow rounded mb-3">
                                            <div className="offerStatus text-white">
                                                <p className="mb-0 text-white">Paid</p>
                                            </div>
                                            <div className="row border-bottom  p-3 align-items-center position-relative">
    
                                                <div className="col-lg-8">
                                                    <div className="row position-relative  ps-5">
                                                        <div className="col-lg-4">
                                                            <img src="hack-thumbnail.svg"
                                                                alt="hack-thumbnail" className="img-fluid"/>
                                                        </div>
                                                        <div className="col-lg-8 text-primary ">
                                                            <h4 className="fw-bold">Fresher UI/UX designer</h4>
                                                            <h5 className="fw-bold">UI/UX Designer </h5>
                                                            <h6 className="text-secondary">Level - Easy</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <h4 className="mb-0 text-center fw-bold text-dark">RS. 100</h4>
                                                </div>
                                            </div>
                                            <div className="row p-4 align-items-start">
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="date-and-time.svg"
                                                                alt="q-pack" className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Date & Time</h4>
                                                            <p className="small mb-0">12-07-2023 | 12:30 PM
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="sector.svg" alt="q-code"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Sector</h4>
                                                            <p className="small mb-0">Easy
                                                                IT Sector</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="location.svg" alt="q-pack"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Location</h4>
                                                            <p className="small mb-0">Easy
                                                                Noida, Uttar Pradesh
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="level-easy.svg" alt="q-pack"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Level</h4>
                                                            <p className="small mb-0">Easy
                                                                Easy
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white shadow rounded mb-3">
                                            <div className="row border-bottom  p-3 align-items-center">
                                                <div className="col-lg-8">
                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <img src="hack-thumbnail.svg"
                                                                alt="hack-thumbnail" className="img-fluid"/>
                                                        </div>
                                                        <div className="col-lg-8 text-primary ">
                                                            <h4 className="fw-bold">Fresher UI/UX designer</h4>
                                                            <h5 className="fw-bold">UI/UX Designer </h5>
                                                            <h6 className="text-secondary">Level - Easy</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <a href="#btn" className="btn btn-primary rounded-pill px-5 mx-auto w-max d-block"
                                                        href="#">Free</a>
                                                </div>
                                            </div>
                                            <div className="row p-4 align-items-start">
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="date-and-time.svg"
                                                                alt="q-pack" className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Date & Time</h4>
                                                            <p className="small mb-0">12-07-2023 | 12:30 PM
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="sector.svg" alt="q-code"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Sector</h4>
                                                            <p className="small mb-0">Easy
                                                                IT Sector</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="location.svg" alt="q-pack"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Location</h4>
                                                            <p className="small mb-0">Easy
                                                                Noida, Uttar Pradesh
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <div className="col-lg-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-child">
                                                            <img src="level-easy.svg" alt="q-pack"
                                                                className="img-fluid"/>
                                                        </div>
                                                        <div className="flex-child status ps-2">
                                                            <h4 className="fs-6 fw-bold mb-0">Level</h4>
                                                            <p className="small mb-0">Easy
                                                                Easy
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
            
        </div>

        
    </div>
      
    </div>
  )
}

export default UPcoming
