import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import ForgetPassword1 from './component/ForgetPassword1';
import ResetPassword1 from './component/ResetPassword1';



import Dashboard from './component/Dashboard'; 





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

        </Routes>
     
    </Router>
  
  );
};

export default App;
