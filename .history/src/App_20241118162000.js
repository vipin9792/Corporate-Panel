import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SignUp from "./component/SignUp";
import OtpVerify from "./component/OtpVerify";
import LoginPage from "./component/LoginPage";
import Dashboard1 from "./component/Dashboard1";

// import ForgetPassword from "./component/ForgetPassword";
// import ResetPassword from "./component/ResetPassword";

// import Dashboard from "./component/Dashboard";

// import Otp from "./component/Otp";
// import EditProfile from "./component/EditProfile";
// import ViewProfile from "./component/ViewProfile";

// import UpgradePlan from "./component/UpgradePlan";
// import Navbar from "./component/Navbar";
// import BuyNowPage from "./component/BuyNowPage";
// import ThankuPage from "./component/ThankuPage";
// import HandleApply from "./component/HandleApply";
// import Api from "./component/Api";


function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<OtpVerify />} />
        <Route path="/ " element={<LoginPage />} />
        <Route path="/Dashboard1" element={<Dashboard1 />} />

        
        {/* <Route path="/ForgetPassword" element={<ForgetPassword />} />
        
        <Route path="/" element={<ResetPassword />} /> */}
     
        {/* <Route path="/" element={<Otp />} />
        <Route path="/" element={<Otp />} /> */}
      
        {/* <Route path="/" element={<ThankuPage />} />
       
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<Api />} />
        <Route path="/" element={<HandleApply />} />
         <Route path="/" element={<Dashboard />} />  */}
       
        {/* <Route path="/" element={<Navbar />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/" element={<ViewProfile />} />
        <Route path="/" element={<ResetPassword />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ViewProfile" element={<ViewProfile />} /> */}
      </Routes>
    </Router>
  

  );
}

export default App;
