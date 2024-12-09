import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import Dashboard1 from "./component/Dashboard1";
import ForgetPassword from "./component/ForgetPassword";
import Otp from "./component/Otp";
import EditProfile from "./component/EditProfile";
import ViewProfile from "./component/ViewProfile";
import ResetPassword from "./component/ResetPassword";
import UpgradePlan from "./component/UpgradePlan";

import BuyNowPage from "./component/BuyNowPage";
import ThankuPage from "./component/ThankuPage";
import HandleApply from "./component/HandleApply";
import Api from "./component/Api";
import SignUp from "./component/SignUp";
import OtpVerify from "./component/OtpVerify";
import ProtectedRoute from "./component/ProtectedRoute"; // The ProtectedRoute component

function App() {
  return (
    <Router>
     
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/LoginPage" element={<LoginPage />} />
       
        <Route path="/otp" element={<Otp />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/thank-you" element={<ThankuPage />} />
        
        {/* Protected Routes */}
        <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard1 />} />} />
        <Route path="/edit-profile" element={<ProtectedRoute element={<EditProfile />} />} />
        <Route path="/view-profile" element={<ProtectedRoute element={<ViewProfile />} />} />
        <Route path="/upgrade-plan" element={<ProtectedRoute element={<UpgradePlan />} />} />
        <Route path="/buy-now" element={<ProtectedRoute element={<BuyNowPage />} />} />
        <Route path="/handle-apply" element={<ProtectedRoute element={<HandleApply />} />} />
        <Route path="/api" element={<ProtectedRoute element={<Api />} />} />

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
