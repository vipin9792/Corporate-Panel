import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignupForm from './component/SignupForm';
//  import LoginForm from './component/LoginForm';
//  import EmailVerificationFlow from './component/EmailVerificationFlow';
//  import ForgetPassword1 from './component/ForgetPassword1';
// import ResetPassword1 from './component/ResetPassword1';




//  import Dashboard from './component/Dashboard'; 
//  import ViewProfile from './component/ViewProfile';
//  import EditProfile from './component/EditProfile';
 import UpgradePlan from './component/UpgradePlan';

 import BuyNowPage from './component/BuyNowPage';
  import Checkout from './component/Checkout';
  import HandleApply from './component/HandleApply';
 import ThankuPage from './component/ThankuPage';
  //  import ProfileDashboard from './component/ProfileDashboard';




const App = () => {
  return (
  
   
    <Router>
   
     
        <Routes>


     {/* <Route path="/" element={<ProfileDashboard />} />    */}
          <Route path="/" element={<SignupForm />} />
        <Route path="/" element={<Checkout />} />
        <Route path="/" element={<HandleApply />} />
        <Route path="/" element={<BuyNowPage />} />
       




          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/verify-otp" element={<EmailVerificationFlow />} />
          <Route path="/ForgetPassword1" element={<ForgetPassword1 />} /> 
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/ResetPassword1/:token/:corpId" element={<ResetPassword1 />} />
          <Route path="/ThankuPage" element={<ThankuPage />} />






          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/ViewProfile" element={<ViewProfile />} /> 
          <Route path="/EditProfile" element={<EditProfile />} /> 
          <Route path="/UpgradePlan" element={<UpgradePlan />} />  


        </Routes>
     
    </Router>
  
  );
};

export default App;
