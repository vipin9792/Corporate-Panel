import React from 'react'

const Pending = () => {
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
                <div className="navbannerad">
                    {/* <img src="web-banner-ad.svg" alt="web-banner-ad" className="img-fluid"/> */}
                </div>
            </aside>
          

           
            <div className="layout-page bg-white h-100vh">
               
                <div className="container">
                    <div className="row mt-3 align-items-center">
                        <div className="col-lg-8">
                            <h4 className=" fw-bold text-primary">Dashborad</h4>
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
                        
                        <div className="position-relative h-100 skyblue rounded p-3 mt-3">
                            <div className="hackthonProfile overflow-auto pe-2 h-100">
                                <div className="overflow-y-scroll overflow-auto h-100 pe-3">
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
                                                <div
                                                    className=" p-2  w-max d-block mx-auto badge badge-approval text-center">
                                                    Pending for approval
                                                </div>
                                                <a href="#btn" className="btn btn-primary rounded-pill px-5 w-max mx-auto d-block mt-3"
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
                                                <div
                                                    className=" p-2  w-max d-block mx-auto badge badge-approval text-center mb-2">
                                                    Pending for approval
                                                </div>
                                                <h4 className="mb-0 text-center fw-bold text-dark">RS. 100</h4>
                                            </div>
                                        </div>
                                        <div className="row p-4 align-items-start">
                                            <div className="col-lg-12">
                                                <div className="row bg-custom-transparent-white rounded p-3">
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
                                                                <img src="sector.svg"
                                                                    alt="q-code" className="img-fluid"/>
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
                                                                <img src="location.svg"
                                                                    alt="q-pack" className="img-fluid"/>
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
                                                                <img src="level-easy.svg"
                                                                    alt="q-pack" className="img-fluid"/>
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
                                                <div
                                                    className=" p-2  w-max d-block mx-auto badge badge-approval text-center">
                                                    Pending for approval
                                                </div>
                                                <a href="#btn" className="btn btn-primary rounded-pill px-5 w-max mx-auto d-block mt-3"
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
   

    <div className="modal fade" id="createHackthon" tabindex="-1" aria-labelledby="creatingHackathon" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header skyblue">
                    <h1 className="modal-title fs-5 text-primary fw-bold mb-0" id="creatingHackathon">Create Hackathon</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-8 mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput" required="" value="Fresher UI/UX designer"/>
                                    <label for="floatingInput"><span><img src="add-title.svg"
                                                alt="add title" className="img-fluid"/></span> Add Title</label>
                                </div>
                            </div>
                            <div className="col-lg-8 mb-3">
                                <div className="row">
                                    <div className="d-flex align-items-center">
                                        <div className="col-lg-4">
                                            <input className="form-check-input" type="radio" name="CP" id="fresher"/>
                                            <label className="form-check-label" for="free">
                                                Free
                                            </label>
                                        </div>
                                        <div className="col-lg-4">
                                            <input className="form-check-input" type="radio" name="CP" id="fresher"/>
                                            <label className="form-check-label" for="paid">
                                                Paid
                                            </label>
                                        </div>
                                        <div className="col-lg-4">
                                            <input type="text" className="text-center bg-light border rounded form-control" value="Rs. 85"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="skyblue text-primary p-3 rounded">
                                    <h6 className="mb-0 fw-bold">Add Banner</h6>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingInput" required="" value="Fresher UI/UX designer"/>
                                    <label for="floatingInput"><span><img src="banner-title.svg"
                                                alt="Banner title" className="img-fluid"/></span> Add Title</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <input type="time" className="form-control" id="floatingInput" required/>
                                    <label for="floatingInput"><span><img src="batch-time.svg"
                                                alt="Time" className="img-fluid"/></span> Time</label>
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <h6>Banner Image</h6>
                                <textarea cols="30" rows="4" className="form-control"></textarea>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <select className="form-select " id="floatingSelect" aria-label="Floating label select example">
                                        <option value="1" selected="">60X468 Px</option>
                                        <option value="2">50X320 Px</option>
                                        <option value="3">90X728 Px</option>
                                        <option value="4">250X250 Px</option>
                                        <option value="5">200X200 Px</option>
                                        <option value="6">250X300 Px</option>
                                        <option value="7">280X336 Px</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img src="banner-size.svg" alt="gender"/> Select Banner Size</label>
                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-floating customUploadButton">
                                    {/* <input className="form-control p-5" type="file" id="formFile" required="" value="upload"/> */}
                                    <label for="formFile" className="form-label text-dark text-center mb-0">Upload File <br/><span className="small text-secondary text-center">
                                        Banner Size - 800X400px
                                    </span></label>
                                </div> 
                                <span className="fs-smaller ms-2 text-secondary">   Supported Formats  PNG, JPEG and file size max 5mb</span>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="floatingInput" required/>
                                    <label for="floatingInput"><span><img src="dash-date.svg"
                                                alt="start date" className="img-fluid"/></span> Start Date</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <input type="time" className="form-control" id="floatingInput" required/>
                                    <label for="floatingInput"><span><img src="batch-time.svg"
                                                alt="role-in-project" className="img-fluid"/></span> Start Time</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <input type="date" className="form-control" id="floatingInput" required/>
                                    <label for="floatingInput"><span><img src="dash-date.svg"
                                                alt="End Date" className="img-fluid"/></span> End Date</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <input type="time" className="form-control" id="floatingInput" required/>
                                    <label for="floatingInput"><span><img src="batch-time.svg"
                                                alt="role-in-project" className="img-fluid"/></span> End Time</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <select className="form-select " id="floatingSelect" aria-label="Floating label select example">
                                        <option value="1" selected="">Easy</option>
                                        <option value="2">Intermediate</option>
                                        <option value="3">Hard  </option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img src="level.svg" alt="level"/> Level</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <select className="form-select " id="floatingSelect" aria-label="Floating label select example">
                                        <option value="1" selected="">IT Gaming</option>
                                        <option value="2">Electrical</option>
                                        <option value="3">Other </option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img src="batch-sector.svg" alt="sector"/> Sector</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <select className="form-select " id="floatingSelect" aria-label="Floating label select example">
                                        <option value="1" selected="">English</option>
                                        <option value="2">Hindi</option>
                                        <option value="3">Spanish</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img src="language.svg" alt="language"/> Language</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <select className="form-select " id="floatingSelect" aria-label="Floating label select example">
                                        <option value="1" selected="">Uttar Pradesh</option>
                                        <option value="2">Haryana</option>
                                        <option value="3">Punjab</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img src="location.svg" alt="state"/>State</label>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-floating">
                                    <select className="form-select " id="floatingSelect" aria-label="Floating label select example">
                                        <option value="1" selected="">Noida</option>
                                        <option value="2">City 2</option>
                                        <option value="3">City 3</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img src="town.svg" alt="gender"/> City</label>
                                </div>
                            </div>
                            <div className="col-lg-12  mb-3">
                                <h6 className="text-dark fw-bold">Upload Logo</h6>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-floating customUploadButton">
                                            {/* <input className="form-control p-5" type="file" id="formFile" required="" value="upload"/> */}
                                            <label for="formFile" className="form-label text-dark text-center mb-0">Upload File <br/><span className="small text-secondary text-center">
                                                Banner Size - 800X400px
                                            </span></label>
                                        </div> 
                                        <span className="fs-smaller ms-2 text-secondary">   Supported Formats  PNG, JPEG and file size max 5mb</span>
                                    </div>
                                </div>
                                <a type="submit" href="#" className="px-3 rounded-pill btn btn-primary mx-auto">
                                    Save
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Pending
