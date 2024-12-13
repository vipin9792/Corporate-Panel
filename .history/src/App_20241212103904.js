import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Navbar from "./component/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
     


        {/* <Route path="/" element={<LoginForm />} /> */}
        <Route path="/SignupForm" element={<SignupForm />} />

    

        <Route path="/" element={<SignupForm />} />

        <Route path="/verify-otp" element={<EmailVerificationFlow />} />
        <Route path="/ForgetPassword1" element={<ForgetPassword1 />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route
          path="/ResetPassword1/:token/:corpId"
          element={<ResetPassword1 />}
        />
        <Route path="/ThankuPage" element={<ThankuPage />} />

        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/Dashboard/:corp_id" element={<Dashboard />} />
        <Route path="/ViewProfile/:corp_id" element={<ViewProfile />} />
        <Route path="/EditProfile1/:corp_id" element={<EditProfile1 />} />

        <Route path="/UpgradePlan/:corp_id" element={<UpgradePlan />} />
        <Route
          path="/plan-details/:corp_id/:id_plan "
          element={<PlanDetails />}
        />
        <Route path="/upgrade-plan/:corp_id" element={<UpgradePlan />} />
        <Route
          path="/plan-details/:id_plan/:corp_id"
          element={<PlanDetails />}
        />
        <Route path="/TransectionPage/:corp_id" element={<TransectionPage />} />
        <Route path="/BatchlistPage/:corp_id" element={<BatchlistPage />} />
        <Route path="/ExamListPage/:corp_id" element={<ExamListPage />} />
        <Route path="/StudentlistPage/:corp_id" element={<StudentlistPage />} /> 
       <Route path="/ChangePassword/:corp_id" element={<ChangePassword />} /> 
       <Route path="/UpdateLogo/:corp_id" element={<UpdateLogo />} /> 
      </Routes>
    </Router>
  );
};

export default App;
