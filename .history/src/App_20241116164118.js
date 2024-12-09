import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";

import Dashboard from "./component/Dashboard";
import ForgetPassword from "./component/ForgetPassword";
import Otp from "./component/Otp";
import EditProfile from "./component/EditProfile";
import ViewProfile from "./component/ViewProfile";
import ResetPassword from "./component/ResetPassword";
import UpgradePlan from "./component/UpgradePlan";
import Navbar from "./component/Navbar";
import BuyNowPage from "./component/BuyNowPage";
import ThankuPage from "./component/ThankuPage";
import HandleApply from "./component/HandleApply";
import Api from "./component/Api";
import SignUp from "./component/SignUp";
// import Slider from "./component/Slider";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignUp />} />
      {/* <Route path="/" element={<Slider />} /> */}
      <Route path="/" element={<ThankuPage />} />
      <Route path="/" element={<ResetPassword />} />
     
     
    
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<Api />} />

        <Route path="/" element={<HandleApply />} />
        <Route path="/" element={<Dashboard />} />

        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/LoginPage" element={<LoginPage />} />
       
       
        

        <Route path="/" element={<ViewProfile />} />

        <Route path="/" element={<ResetPassword />} />

        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ViewProfile" element={<ViewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
