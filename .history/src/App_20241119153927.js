import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import Dashboard1 from './component/Dashboard1'; // Import your dashboard or next page

const App = () => {
  return (
    <Router>
      <div>
       
        <Routes>
          <Route path="/" element={<SignupForm />} />
        
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify-otp" element={<EmailVerificationFlow />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} /> {/* Define the dashboard page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
