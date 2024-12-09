import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';


const App = () => {
  return (
    <Router>
      <div>
        <h1>Email Verification and Authentication App</h1>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify-email" element={<EmailVerificationFlow />} />
          <Route path="/verify-otp" element={<ResendOtpPage />} /> {/* Add route for new OTP page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
