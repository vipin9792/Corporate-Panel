<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pareekshn - An online assessment platform</title>
    <link rel="icon" type="image/x-icon" href="assets/img/favicon/favicon.ico" />
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/vendor/css/core.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/sneat.css">
    <link rel="stylesheet" href="assets/css/height.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="assets/css/common.css">
    <link rel="stylesheet" href="assets/css/hackthon.css">
    <link rel="stylesheet" href="assets/css/sneat-scroll.css">
    <script src="assets/vendor/js/helpers.js"></script>
    <script src="//cdn.amcharts.com/lib/4/core.js"></script>
    <script src="//cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="//cdn.amcharts.com/lib/4/themes/animated.js"></script>
</head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->

            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-primary">
                <div class="app-brand demo">
                    <a href="index.html" class="app-brand-link">
                        <img src="assets/images/logo.svg" alt="dashboard-active" class="img-fluid">
                    </a>

                    <a href="javascript:void(0);"
                        class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i class="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div class="menu-inner-shadow"></div>

                <ul class="menu-inner py-1">
                    <!-- Dashboard -->
                    <li class="menu-item  active">
                        <a href="dashboard.html" class="menu-link">
                            <img src="assets/images/dashboard-active.svg" alt=""
                                class="menu-icon tf-icons bx bx-home-circle">
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="personal-profile.html" class="menu-link">
                            <img src="assets/images/profile-inactive.svg" alt=""
                                class="menu-icon tf-icons bx bx-home-circle">
                            <div data-i18n="Analytics">Profile</div>
                        </a>
                    </li>

                    <li class="menu-item">
                        <a href="javascript:void(0);" class="menu-link menu-toggle">
                            <img src="assets/images/hackathon/hackathon-inactive.svg"
                                class="menu-icon tf-icons bx bx-layout">
                            <div data-i18n="Layouts">Hackathon Status</div>
                        </a>
                        <ul class="menu-sub">
                            <li class="menu-item">
                                <a href="upcoming-hackathon.html" class="menu-link">
                                    <div data-i18n="Without menu"> <img
                                            src="assets/images/hackathon/upcoming-hackathon.svg" class="me-2">Upcoming
                                        Hackathon
                                    </div>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="completed-hackathon.html" class="menu-link">
                                    <div data-i18n="Without menu"> <img
                                            src="assets/images/hackathon/completed-hackathon.svg" class="me-2">Completed
                                        Hackathon
                                    </div>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="pending-hackathon.html" class="menu-link">
                                    <div data-i18n="Without menu"> <img
                                            src="assets/images/hackathon/pending-hackathon.svg" class="me-2">Pending
                                        Hackathon
                                    </div>
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="rejected-hackathon.html" class="menu-link">
                                    <div data-i18n="Without menu"> <img
                                            src="assets/images/hackathon/rejected-hackathon.svg" class="me-2">Rejected
                                        Hackathon
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="menu-item">
                        <a href="index.html" class="menu-link">
                            <img src="assets/images/logout.svg" alt="" class="menu-icon tf-icons bx bx-home-circle">
                            <div data-i18n="Analytics">Logout</div>
                        </a>
                    </li>
                </ul>
                <div class="navbannerad">
                    <img src="assets/images/web-banner-ad.svg" alt="web-banner-ad" class="img-fluid">
                </div>
            </aside>
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page bg-white h-100vh">
                <!-- Navbar -->
                <div class="container h-15vh">
                    <div class="row mt-3 align-items-center">
                        <div class="col-lg-8">
                            <h4 class=" fw-bold text-primary">Dashboard</h4>
                        </div>
                        <div class="col-lg-4">
                            <div class="row justify-content-end">
                                <div class="col-lg-6">
                                    <div class="border rounded-pill p-1 d-flex align-items-center upDashboard">
                                        <img src="assets/images/d-user.svg" alt="d-user" class="img-fluid" width="50px">
                                        <h6 class="ms-2 mb-0"><span class="text-primary">Welcome</span> <br> User TP
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- / Navbar -->
                <div class="container-fluid  h-80vh">
                    <!-- Content wrapper -->
                    <div class="content-wrapper h-100">
                        <!-- Content -->
                        <div class="position-relative h-100 skyblue rounded p-3 overflow-hidden">
                            <div class="row h-100">
                                <div class="col-lg-10 h-100">
                                    <div class="bg-skyblue-gradient shadow rounded mb-3">
                                        <div class="row align-items-center text-dark">
                                            <div class="col-lg-4 ps-4">
                                                <h5 class="fs-5 fw-bold text-dark">Choose<br> <span class="fs-4">Right
                                                        Candidates</span> <br> on one Click</h5>
                                            </div>
                                            <div class="col-lg-4">
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#createHackthon"
                                                    class="rounded-pill d-block w-max border-0 fw-bold mx-auto btn btn-yellow-gradient text-dark">
                                                    Create Hackathon
                                                </a>
                                            </div>
                                            <div class="col-lg-4 pe-4">
                                                <img src="assets/images/hackathon-girl.svg" alt="hackathon-girl"
                                                    class="img-fluid">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="overflow-auto h-65 overflow-y-scroll pe-3">
                                        <div class="bg-white shadow rounded mb-3">
                                            <div class="row  p-3 align-items-center">
                                                <div class="col-lg-6">
                                                    <div class="row">
                                                        <div class="col-lg-4">
                                                            <img src="assets/images/hackathon/hack-thumbnail.svg"
                                                                alt="hack-thumbnail" class="img-fluid">
                                                        </div>
                                                        <div class="col-lg-8 text-primary ">
                                                            <h4 class="fw-bold">Fresher UI/UX designer</h4>
                                                            <h5 class="fw-bold">UI/UX Designer </h5>
                                                            <h6 class="text-secondary">Level - Easy</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="row align-items-start">
                                                        <div class="col-lg-6">
                                                            <div class="d-flex align-items-start">
                                                                <div class="flex-child">
                                                                    <img src="assets/images/hackathon/date-and-time.svg"
                                                                        alt="q-pack">
                                                                </div>
                                                                <div class="flex-child status ps-2">
                                                                    <h4 class="fs-6 fw-bold mb-0">Date & Time</h4>
                                                                    <p class="small">12-07-2023 | 12:30 PM
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="d-flex align-items-start">
                                                                <div class="flex-child">
                                                                    <img src="assets/images/hackathon/location.svg"
                                                                        alt="q-pack">
                                                                </div>
                                                                <div class="flex-child status ps-2">
                                                                    <h4 class="fs-6 fw-bold mb-0">Location</h4>
                                                                    <p class="small">Easy
                                                                        Noida, Uttar Pradesh
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="d-flex align-items-start">
                                                                <div class="flex-child">
                                                                    <img src="assets/images/hackathon/sector.svg"
                                                                        alt="q-code">
                                                                </div>
                                                                <div class="flex-child status ps-2">
                                                                    <h4 class="fs-6 fw-bold mb-0">Duration</h4>
                                                                    <p class="small mb-0">60 Mins</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="d-flex align-items-start">
                                                                <div class="flex-child">
                                                                    <img src="assets/images/hackathon/level-easy.svg"
                                                                        alt="q-code">
                                                                </div>
                                                                <div class="flex-child status ps-2">
                                                                    <h4 class="fs-6 fw-bold mb-0">Total Marks</h4>
                                                                    <p class="small mb-0">100</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row p-3">
                                                <div class="col-lg-6">
                                                    <div class="skyblue border rounded">
                                                        <div id="chartdiv1"></div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="skyblue border rounded">
                                                        <div id="chartdiv2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="table-responsive  text-nowrap   rounded-border overflow-hidden px-4 ">
                                                <table class="table custom-rounded-table border" id="adminTable">
                                                    <thead class="wrapingHead">
                                                        <tr class="text-nowrap">
                                                            <th>Student Name</th>
                                                            <th>Marks of % Scored</th>
                                                            <th>Time Taken</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img src="assets/images/hackathon/rank-1.svg"
                                                                    alt="rank-1-badge" class="rank img-fluid me-2">
                                                                <img src="assets/images/student-1.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="assets/images/hackathon/rank-2.svg"
                                                                    alt="rank-1-badge" class="rank img-fluid me-2">
                                                                <img src="assets/images/student-2.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="assets/images/hackathon/rank-3.svg"
                                                                    alt="rank-1-badge" class="rank img-fluid me-2">
                                                                <img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="assets/images/student-3.svg" alt="student"
                                                                    class="img-fluid rounded-circle me-1 student-img">
                                                                Rahul Sankar
                                                            </td>
                                                            <td>66 .00 (66%)</td>
                                                            <td>01 : 25 Hrs</td>
                                                            <td>
                                                                <a href="#download"
                                                                    class="rounded-pill btn btn-transparent text-primary  border-primary">
                                                                    Download CV
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <a href="view-all-result.html" class=" rounded-pill d-block w-max mx-auto my-4 btn btn-primary">
                                                View All Passed Students
                                            </a>
                                            <hr class="border-0">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 h-100">
                                    <div class="bg-white shadow rounded p-4 h-100">
                                        <div class="game-zone">
                                            <img src="assets/images/game-zone.svg" alt="game-zone"
                                                class="img-fluid d-block mx-auto">
                                        </div>

                                        <div class="game-zone">
                                            <img src="assets/images/game-zone.svg" alt="game-zone"
                                                class="img-fluid d-block mx-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Content wrapper -->
            </div>
            <!-- / Layout page -->
        </div>

        <!-- Overlay -->
    </div>
    <!-- / Layout wrapper -->

    <div class="modal fade" id="createHackthon" tabindex="-1" aria-labelledby="creatingHackathon" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header skyblue">
                    <h1 class="modal-title fs-5 text-primary fw-bold mb-0" id="creatingHackathon">Create Hackathon</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-8 mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingInput" required=""
                                        placeholder="Fresher UI/UX designer">
                                    <label for="floatingInput"><span><img src="assets/images/hackathon/add-title.svg"
                                                alt="add title" class="img-fluid"></span> Add Title</label>
                                </div>
                            </div>
                            <div class="col-lg-8 mb-3">
                                <div class="row">
                                    <div class="d-flex align-items-center">
                                        <div class="col-lg-4">
                                            <input class="form-check-input" type="radio" name="CP" id="free">
                                            <label class="form-check-label" for="free">
                                                Free
                                            </label>
                                        </div>
                                        <div class="col-lg-4">
                                            <input class="form-check-input" type="radio" name="CP" id="paid">
                                            <label class="form-check-label" for="paid">
                                                Paid
                                            </label>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="position-relative border rounded overflow-hidden" id="crInput">
                                                <input type="text"
                                                    class="border-0 ms-3 bg-light border rounded form-control"
                                                    placeholder="0.00">
                                                <div class="currency">
                                                    Rs.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 mb-3">
                                <div class="skyblue text-primary p-3 rounded">
                                    <h6 class="mb-0 fw-bold">Add Banner</h6>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingInput" required=""
                                        placeholder="Fresher UI/UX designer">
                                    <label for="floatingInput"><span><img src="assets/images/hackathon/banner-title.svg"
                                                alt="Banner title" class="img-fluid"></span> Banner Title</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="border rounded p-2">
                                    <label class="mb-2 csdt"><span><img src="assets/images/batch-time.svg" alt="Time"
                                                class="img-fluid"></span> Time</label>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                Hr <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option">00</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                Min <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option">00</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                PM <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option"></option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <select class="form-select " id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1" selected="">60X468 Px</option>
                                        <option value="2">50X320 Px</option>
                                        <option value="3">90X728 Px</option>
                                        <option value="4">250X250 Px</option>
                                        <option value="5">200X200 Px</option>
                                        <option value="6">250X300 Px</option>
                                        <option value="7">280X336 Px</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img
                                            src="assets/images/hackathon/banner-size.svg" alt="gender"> Select Banner
                                        Size</label>
                                </div>
                            </div>
                            <div class="col-lg-6  mb-3">
                                <div class="form-floating customUploadButton">
                                    <input class="form-control p-5" type="file" id="formFile" required=""
                                        value="upload">
                                    <label for="formFile" class="form-label text-dark text-center mb-0">Upload File
                                        <br><span class="small text-secondary text-center">
                                            Banner Size - 800X400px
                                        </span></label>
                                </div>
                                <span class="fs-smaller ms-2 text-secondary"> Supported Formats PNG, JPEG and file size
                                    max 5mb</span>
                            </div>
                            <div class="col-lg-12 mb-3">
                                <h6>Banner Image</h6>
                                <div class="border rounded">
                                    <label for="add-desc" class="ps-2 pt-2 text-primary"><img
                                            src="assets/images/add-description.svg" alt="add-description" width="20">
                                        Add Description</label>
                                    <textarea cols="30" rows="4" class="form-control border-0" id="add-desc"></textarea>

                                </div>
                            </div>

                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <input type="date" class="form-control" id="floatingInput" required
                                        value="2018-07-22">
                                    <label for="floatingInput"><span><img src="assets/images/dash-date.svg"
                                                alt="start date" class="img-fluid"></span> Start Date</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="border rounded p-2">
                                    <label class="mb-2 csdt"><span><img src="assets/images/batch-time.svg" alt="Time"
                                                class="img-fluid"></span> Start Time</label>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                Hr <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option">00</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                Min <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option">00</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                PM <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option"></option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <input type="date" class="form-control" id="floatingInput" value="2023-07-22"
                                        required>
                                    <label for="floatingInput"><span><img src="assets/images/dash-date.svg"
                                                alt="End Date" class="img-fluid"></span> End Date</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="border rounded p-2">
                                    <label class="mb-2 csdt"><span><img src="assets/images/batch-time.svg" alt="Time"
                                                class="img-fluid"></span> End Time</label>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                Hr <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option">00</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                Min <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option">00</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div class="col-lg-4">
                                            <span class="ms-2 text-dark">
                                                PM <select name="" id="" class="w-max ps-0 border-0">
                                                    <option value="option"></option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <select class="form-select " id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1" selected="">Easy</option>
                                        <option value="2">Intermediate</option>
                                        <option value="3">Hard </option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img
                                            src="assets/images/level.svg" alt="level"> Level</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <select class="form-select " id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1" selected="">IT Gaming</option>
                                        <option value="2">Electrical</option>
                                        <option value="3">Other </option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img
                                            src="assets/images/batch-sector.svg" alt="sector"> Sector</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <select class="form-select " id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1" selected="">English</option>
                                        <option value="2">Hindi</option>
                                        <option value="3">Spanish</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img
                                            src="assets/images/language.svg" alt="language"> Language</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <select class="form-select " id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1" selected="">Uttar Pradesh</option>
                                        <option value="2">Haryana</option>
                                        <option value="3">Punjab</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img
                                            src="assets/images/location.svg" alt="state">State</label>
                                </div>
                            </div>
                            <div class="col-lg-6 mb-3">
                                <div class="form-floating">
                                    <select class="form-select " id="floatingSelect"
                                        aria-label="Floating label select example">
                                        <option value="1" selected="">Noida</option>
                                        <option value="2">City 2</option>
                                        <option value="3">City 3</option>
                                    </select>
                                    <label for="floatingSelect text-primary ulSelectGen" id="ulSelectGen"><img
                                            src="assets/images/town.svg" alt="gender"> City</label>
                                </div>
                            </div>
                            <div class="col-lg-12  mb-3">
                                <h6 class="text-dark fw-bold text-primary">Upload Logo</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-floating customUploadButton">
                                            <input class="form-control p-5" type="file" id="formFile" required=""
                                                value="upload">
                                            <label for="formFile" class="form-label text-dark text-center mb-0">Upload
                                                File <br><span class="small text-secondary text-center">
                                                    Banner Size - 800X400px
                                                </span></label>
                                        </div>
                                        <span class="fs-smaller ms-2 text-secondary"> Supported Formats PNG, JPEG and
                                            file size max 5mb</span>
                                    </div>
                                </div>
                                <a type="submit" href="#"
                                    class="px-3 rounded-pill btn btn-primary mx-auto w-max d-block mt-3">
                                    Save
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
    <script src="assets/vendor/libs/popper/popper.js"></script>
    <script src="assets/vendor/js/bootstrap.js"></script>
    <script src="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

    <script src="assets/vendor/js/menu.js"></script>
    <!-- endbuild -->

    <!-- Vendors JS -->
    <script src="assets/vendor/libs/apex-charts/apexcharts.js"></script>

    <!-- Main JS -->
    <script src="assets/js/main.js"></script>

    <!-- Place this tag in your head or just before your close body tag. -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>
    <script>
        $('#adminTable').DataTable({
            scrollX: false,
            autoWidth: false,
            bFilter: false,
            lengthChange: false,
            info: false,
            ordering: false,
            paging: false
        });
    </script>

    <script>
        let crInputContainer = document.getElementById('crInput');
        let crInput = crInputContainer.querySelector("input");
        let originalPlaceholder = crInput.getAttribute('placeholder');
        let inputValue = '';

        crInputContainer.onclick = function (event) {
            if (event.target === crInput) {
                crInput.removeAttribute('placeholder');
            }
        };

        crInput.addEventListener('input', function (event) {
            inputValue = event.target.value;
        });

        document.addEventListener('click', function (event) {
            if (!crInputContainer.contains(event.target)) {
                crInput.value = inputValue;
                crInput.setAttribute('placeholder', originalPlaceholder);
            }
        });
        // pie chart script start here

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv1", am4charts.PieChart);
        // var chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
            {
                student: "Appeared ",
                value: 150
            },
            {
                student: "",
                value: 128
            }
        ];

        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "student";

        series.slices.template.cornerRadius = 0;
        series.slices.template.innerCornerRadius = 0;
        series.slices.template.draggable = false;
        series.slices.template.inert = true;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;
        chart.legend = new am4charts.Legend();
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("chartdiv2", am4charts.PieChart);
        // var chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.data = [
            {
                student: "Appeared ",
                value: 150
            },
            {
                student: "",
                value: 128
            }
        ];

        chart.radius = am4core.percent(70);
        chart.innerRadius = am4core.percent(40);
        chart.startAngle = 180;
        chart.endAngle = 360;

        var series = chart.series.push(new am4charts.PieSeries());
        series.dataFields.value = "value";
        series.dataFields.category = "student";

        series.slices.template.cornerRadius = 0;
        series.slices.template.innerCornerRadius = 0;
        series.slices.template.draggable = false;
        series.slices.template.inert = true;

        series.hiddenState.properties.startAngle = 90;
        series.hiddenState.properties.endAngle = 90;
        chart.legend = new am4charts.Legend();


    </script>
</body>

</html>