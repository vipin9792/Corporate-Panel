import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignupForm from "./component/SignupForm";
import LoginForm from "./component/LoginForm";
import EmailVerificationFlow from "./component/EmailVerificationFlow";
import ForgetPassword1 from "./component/ForgetPassword1";
import ResetPassword1 from "./component/ResetPassword1";
import Dashboard from "./component/Dashboard";
import UpgradePlan from "./component/UpgradePlan";
import BuyNowPage from "./component/BuyNowPage";
import ThankuPage from "./component/ThankuPage";
import EditProfile1 from "./component/EditProfile1";
import ViewProfile from "./component/ViewProfile";
import UpgradePlan1 from "./component/UpgradePlan1";
import PlanDetails from "./component/PlanDetails";
import TransectionPage from "./component/TransectionPage";
import BatchlistPage from "./component/BatchlistPage";
import ExamListPage from "./component/ExamListPage";
import StudentlistPage from "./component/StudentlistPage";
import ChangePassword from "./component/ChangePassword";
import UpdateLogo from "./component/UpdateLogo";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state
  const [corpId, setCorpId] = useState(null); // Store corporate ID

  // Function to handle login success
  const handleLogin = (id) => {
    setIsAuthenticated(true); // User is logged in
    setCorpId(id); // Store the corpId
    console.log("Logged in with Corp ID:", id);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // User is logged out
    setCorpId(null); // Clear the corpId
  };

  return (
    <Router>
      <Routes>
        {/* Home Route: Conditionally navigate to Dashboard or show LoginForm */}
        <Route
          path="/"
          element={
            isAuthenticated && corpId ? (
              <Navigate to={`/Dashboard/${corpId}`} replace />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />

        {/* Login Route: Ensures onLogin is passed */}
        <Route
          path="/LoginForm"
          element={
            isAuthenticated && corpId ? (
              <Navigate to={`/Dashboard/${corpId}`} replace />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />

        {/* Signup Route */}
        <Route path="/SignupForm" element={<SignupForm />} />

        {/* Email Verification Route */}
        <Route path="/verify-otp" element={<EmailVerificationFlow />} />

        {/* Forget Password Route */}
        <Route path="/ForgetPassword1" element={<ForgetPassword1 />} />

        {/* Reset Password Route */}
        <Route path="/ResetPassword1/:token/:corpId" element={<ResetPassword1 />} />

        {/* Thank You Page Route */}
        <Route path="/ThankuPage" element={<ThankuPage />} />

        {/* Protected Routes */}
        <Route
          path="/Dashboard/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/ViewProfile/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <ViewProfile onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/EditProfile1/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <EditProfile1 />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/UpgradePlan/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <UpgradePlan />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/plan-details/:corp_id/:id_plan"
          element={
            isAuthenticated && corpId ? (
              <PlanDetails />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/TransectionPage/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <TransectionPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/BatchlistPage/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <BatchlistPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/ExamListPage/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <ExamListPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/StudentlistPage/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <StudentlistPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/ChangePassword/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <ChangePassword />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/UpdateLogo/:corp_id"
          element={
            isAuthenticated && corpId ? (
              <UpdateLogo />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
