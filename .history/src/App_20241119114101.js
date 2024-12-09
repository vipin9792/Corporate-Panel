import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import EmailVerificationFlow from './component/EmailVerificationFlow';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Email Verification and Authentication App</h1>
        <Routes>
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/LoginForm" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerificationFlow />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;