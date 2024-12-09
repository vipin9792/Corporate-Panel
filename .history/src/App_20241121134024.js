import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import ForgetPassword1 from './component/ForgetPassword1';
import ResetPassword1 from './component/ResetPassword1';




import Dashboard from './component/Dashboard'; 
import ViewProfile from './component/ViewProfile';
import EditProfile from './component/EditProfile';




const App = () => {
  return (
  
   
    <Router>
   
     
        <Routes>
  
          <Route path="/" element={<SignupForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/verify-otp" element={<EmailVerificationFlow />} />
          <Route path="/ForgetPassword1" element={<ForgetPassword1 />} /> 
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/ResetPassword1/:token/:corpId" element={<ResetPassword1 />} />






          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/ViewProfile" element={<ViewProfile />} /> 
          <Route path="/EditProfile" element={<EditProfile />} /> 
          <Route path="/UpgradePlan" element={<UpgradePlan />} />

        </Routes>
     
    </Router>
  
  );
};

export default App;
