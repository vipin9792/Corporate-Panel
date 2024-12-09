import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import Dashboard1 from './component/Dashboard1'; 
import ForgetPassword1 from './component/ForgetPassword1';
import ResetPassword1 from './component/ResetPassword1';
import { Navbar } from 'react-bootstrap';



const App = () => {
  return (
  
   
    <Router>
   
     
        <Routes>
        <Route path="/" element={</>} />
          <Route path="/" element={<SignupForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/verify-otp" element={<EmailVerificationFlow />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} /> 
          <Route path="/ForgetPassword1" element={<ForgetPassword1 />} /> 
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/ResetPassword1/:token/:corpId" element={<ResetPassword1 />} />

        </Routes>
     
    </Router>
  
  );
};

export default App;
