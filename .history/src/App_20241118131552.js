import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
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
import OtpVerify from "./component/OtpVerify";
import Apk from "./component/Apk";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (without Navbar) */}
        <Route path="/" element={<SignUp />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/thank-you" element={<ThankuPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/api" element={<Api />} />
        <Route path="/handle-apply" element={<HandleApply />} />

        {/* Protected Routes - Navbar will be present here */}
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/upgrade-plan" element={<UpgradePlan />} />
          <Route path="/buy-now" element={<BuyNowPage />} />
        </Route>

        {/* Login and SignUp Routes */}
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
