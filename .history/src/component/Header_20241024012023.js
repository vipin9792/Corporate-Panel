import React from 'react'

const Header = () => {
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* <!-- Menu --> */}

          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-primary"
          >
            <div className="app-brand demo">
              <a href="index.html" className="app-brand-link">
                <img
                  src="logo.svg"
                  alt="dashboard-active"
                  className="img-fluid"
                />
              </a>

              <a
                href="javascript:void(0);"
                className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
              >
                <i className="bx bx-chevron-left bx-sm align-middle"></i>
              </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
              {/* <!-- Dashboard --> */}
              <li className="menu-item  active">
                <a href="dashboard.html" className="menu-link">
                  <img
                    src="dashboard-active.svg"
                    alt=""
                    className="menu-icon tf-icons bx bx-home-circle"
                  />
                  <div data-i18n="Analytics">Dashboard</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="personal-profile.html" className="menu-link">
                  <img
                    src="profile-inactive.svg"
                    alt=""
                    className="menu-icon tf-icons bx bx-home-circle"
                  />
                  <div data-i18n="Analytics" className="text-white">
                    Profile
                  </div>
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
                <a href="#" className="menu-link">
                  <img
                    src="logout.svg"
                    alt=""
                    className="menu-icon tf-icons bx bx-home-circle"
                  />
                  <div data-i18n="Analytics" className="text-white">
                    Sector
                  </div>
                </a>
              </li>

              <li className="menu-item">
                <a href="#" className="menu-link">
                  <img
                    src="logout.svg"
                    alt=""
                    className="menu-icon tf-icons bx bx-home-circle"
                  />
                  <div data-i18n="Analytics" className="text-white">
                    Logout
                  </div>
                </a>
              </li>
            </ul>

            {/* <div className="navbannerad">
                    <img src="web-banner-ad.svg" alt="web-banner-ad" className="img-fluid"/>
                </div> */}
          </aside>
          {/* <!-- / Menu --> */}

          {/* <!-- Layout container --> */}
          <div className="layout-page bg-white h-100vh">
            {/* <!-- Navbar --> */}
            <div className="container h-15vh">
              <div className="row mt-3 align-items-center">
                <div className="col-lg-8">
                  <h4 className=" fw-bold text-primary">Dashboard</h4>
                </div>
                <div className="col-lg-4">
                  <div className="row justify-content-end">
                    <div className="col-lg-6">
                      <div className="border rounded-pill p-1 d-flex align-items-center upDashboard">
                        <img
                          src="d-user.svg"
                          alt="d-user"
                          className="img-fluid"
                          width="50px"
                        />
                        <h6 className="ms-2 mb-0">
                          <span className="text-primary">Welcome</span> <br />{" "}
                          User TP
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

				
				
				
            <div class="container-fluid  h-85vh">
                    {/* <!-- Content wrapper --> */}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minus officia libero? Ipsum sequi cumque, fuga quia quibusdam, id facilis nisi eum ducimus dolore optio magnam, maxime impedit eveniet? Animi!</p>
                    <div class="content-wrapper h-100">
                        {/* <!-- Content --> */}

{/* main content start here */}

{/* main content start end */}

                    </div>
                </div>
				
				
           
				
			


                {/* <!-- Content wrapper --> */}
            </div>
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
                {/* <!-- / Navbar --> */}
                
            {/* <!-- / Layout page --> */}
        </div>

        {/* <!-- Overlay --> */}
    </div>
	
	
	
	
	



      
    </div>
  )
}

export default Header
