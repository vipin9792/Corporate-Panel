import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignupForm from "./component/SignupForm";
import LoginForm from "./component/LoginForm";
import EmailVerificationFlow from "./component/EmailVerificationFlow";
import ForgetPassword1 from "./component/ForgetPassword1";
import ResetPassword1 from "./component/ResetPassword1";

import Dashboard from "./component/Dashboard";

import EditProfile from "./component/EditProfile";
import UpgradePlan from "./component/UpgradePlan";

import BuyNowPage from "./component/BuyNowPage";

import HandleApply from "./component/HandleApply";
import ThankuPage from "./component/ThankuPage";
//  import ProfileDashboard from './component/ProfileDashboard';
import EditProfile1 from "./component/EditProfile1";
import ViewProfile from "./component/ViewProfile";
import UpgradePlan1 from "./component/UpgradePlan1";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/UpgradePlan1" element={<UpgradePlan1 />} />
        <Route path="/" element={<SignupForm />} />

        <Route path="/" element={<HandleApply />} />

        <Route path="/" element={<SignupForm />} />
        <Route path="/" element={<BuyNowPage />} />

        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/verify-otp" element={<EmailVerificationFlow />} />
        <Route path="/ForgetPassword1" element={<ForgetPassword1 />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route
          path="/ResetPassword1/:token/:corpId"
          element={<ResetPassword1 />}
        />
        <Route path="/ThankuPage" element={<ThankuPage />} />

        <Route path="/EditProfile" element={<EditProfile />} />

        <Route path="/Dashboard/:corp_id" element={<Dashboard />} />
        <Route path="/ViewProfile/:corp_id" element={<ViewProfile />} />
        <Route path="/EditProfile1/:corp_id" element={<EditProfile1 />} />

        <Route path="/UpgradePlan/:corp_id" element={<UpgradePlan />} />
      </Routes>
    </Router>
  );
};

export default App;
