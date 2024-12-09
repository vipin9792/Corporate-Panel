import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import Dashboard1 from './component/Dashboard1'; // Import your dashboard or next page
import ForgetPassword1 from './component/ForgetPassword1';


const App = () => {
  return (
    <Router>
      <div>
       
        <Routes>
       
          <Route path="/" element={<SignupForm />} />
        
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/verify-otp" element={<EmailVerificationFlow />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} /> {/* Define the dashboard page */}
          <Route path="/ForgetPassword1" element={<ForgetPassword1 />} /> 
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
