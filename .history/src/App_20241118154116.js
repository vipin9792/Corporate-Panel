import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import Dashboard1 from "./component/Dashboard1";
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
import OtpVerify from "./component/OtpVerify";

function App() {
  const token = localStorage.getItem("authToken");

  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<SignUp />} />
        <Route
          path="/"
          element={token ? <Navigate to="/Dashboard1" /> : <LoginPage />}
        />
        
        {/* Protect the Dashboard route, redirect to login if no token is present */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard1 /> : <Navigate to="/Dashboard1" />}
        />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/UpgradePlan" element={<UpgradePlan />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/BuyNowPage" element={<BuyNowPage />} />
        <Route path="/ThankuPage" element={<ThankuPage />} />
        <Route path="/HandleApply" element={<HandleApply />} />
        <Route path="/Api" element={<Api />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ViewProfile" element={<ViewProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
