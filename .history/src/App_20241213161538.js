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

import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
     

       <Route path="/" element={<LoginForm />} /> 
        <Route path="/SignupForm" element={<SignupForm />} />

    

        
 
        {/* <Route path="/Navbar" element={<Navbar/>} />  */}
        {/* <Route path="/verify-otp" element={<EmailVerificationFlow />} /> */}
        {/* <Route path="/ForgetPassword1" element={<ForgetPassword1 />} /> */}
       
        {/* <Route
          path="/ResetPassword1/:token/:corpId"
          element={<ResetPassword1 />}
        /> */}
        {/* <Route path="/ThankuPage" element={<ThankuPage />} /> */}

       

        {/* <Route path="/Dashboard/:corp_id" element={<Dashboard />} />
        <Route path="/ViewProfile/:corp_id" element={<ViewProfile />} />
        <Route path="/EditProfile1/:corp_id" element={<EditProfile1 />} />

        <Route path="/UpgradePlan/:corp_id" element={<UpgradePlan />} /> */}


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
         <Route path="/TransectionPage/:corp_id" element={<PrivateRoute element={TransectionPage} />} />
         <Route path="/BatchlistPage/:corp_id" element={<PrivateRoute element={BatchlistPage} />} />
         <Route path="/ExamListPage/:corp_id" element={<PrivateRoute element={ExamListPage} />} />
         <Route path="/StudentlistPage/:corp_id" element={<PrivateRoute element={StudentlistPage} />} /> 
         <Route path="/ChangePassword/:corp_id" element={<PrivateRoute element={ChangePassword} />} /> 
         <Route path="/verify-otp" element={<PrivateRoute element={EmailVerificationFlow} />} />
         <Route path="/ForgetPassword1" element={<PrivateRoute element={ForgetPassword1} />} />
         <Route
          path="/ResetPassword1/:token/:corpId"
          element={<PrivateRoute element={ResetPassword1} />}
        />
         <Route path="/ThankuPage" element={<PrivateRoute element={ThankuPage} />} />

         <Route path="/Navbar" element={<PrivateRoute element={Navbar/}>} /> 

        {/* Other protected routes */}









        {/* <Route
          path="/plan-details/:corp_id/:id_plan "
          element={<PlanDetails />}
        /> */}
        {/* <Route path="/upgrade-plan/:corp_id" element={<UpgradePlan />} /> */}
        {/* <Route
          path="/plan-details/:id_plan/:corp_id"
          element={<PlanDetails />}
        /> */}
        {/* <Route path="/TransectionPage/:corp_id" element={<TransectionPage />} /> */}
        {/* <Route path="/BatchlistPage/:corp_id" element={<BatchlistPage />} /> */}
        {/* <Route path="/ExamListPage/:corp_id" element={<ExamListPage />} /> */}
        {/* <Route path="/StudentlistPage/:corp_id" element={<StudentlistPage />} />  */}
       {/* <Route path="/ChangePassword/:corp_id" element={<ChangePassword />} />  */}
       {/* <Route path="/UpdateLogo/:corp_id" element={<UpdateLogo />} />  */}
      </Routes>
    </Router>
  );
};

export default App;
