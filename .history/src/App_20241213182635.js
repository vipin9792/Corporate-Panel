import React from "react";
import SecureComponent from "./component/SecureComponent";
import ErrorPage from "./ErrorPage";



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


import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/corp/:corp_id" element={<SecureComponent />} />
      <Route path="/error" element={<ErrorPage />} />





        <Route path="/" element={<LoginForm />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/verify-otp" element={<EmailVerificationFlow />} />
        <Route path="/ChangePassword/:corp_id" element={<ChangePassword />} />
        <Route path="/ForgetPassword1" element={<ForgetPassword1 />} />
        <Route path="/ThankuPage" element={<ThankuPage />} />
        <Route
          path="/ResetPassword1/:token/:corpId"
          element={<ResetPassword1 />}
        />

        {/* Protected Routes */}

        <Route
          path="/Dashboard/:corp_id"
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route
          path="/ViewProfile/:corp_id"
          element={<PrivateRoute element={ViewProfile} />}
        />
        <Route
          path="/EditProfile1/:corp_id"
          element={<PrivateRoute element={EditProfile1} />}
        />
        <Route
          path="/UpgradePlan/:corp_id"
          element={<PrivateRoute element={UpgradePlan} />}
        />
        <Route
          path="/plan-details/:corp_id/:id_plan "
          element={<PrivateRoute element={PlanDetails} />}
        />

        <Route
          path="/plan-details/:id_plan/:corp_id"
          element={<PrivateRoute element={PlanDetails} />}
        />
        <Route
          path="/TransectionPage/:corp_id"
          element={<PrivateRoute element={TransectionPage} />}
        />
        <Route
          path="/BatchlistPage/:corp_id"
          element={<PrivateRoute element={BatchlistPage} />}
        />
        <Route
          path="/ExamListPage/:corp_id"
          element={<PrivateRoute element={ExamListPage} />}
        />
        <Route
          path="/StudentlistPage/:corp_id"
          element={<PrivateRoute element={StudentlistPage} />}
        />
        <Route path="/Navbar" element={<PrivateRoute element={Navbar} />} />

       
        {/* Other protected routes */}
      </Routes>
    </Router>
  );
};

export default App;
