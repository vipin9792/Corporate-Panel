import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import Dashboard1 from './component/Dashboard'; // Import your dashboard or next page

const App = () => {
  return (
    <Router>
      <div>
        <h1>Email Verification and Authentication App</h1>
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/verify-email" element={<EmailVerificationFlow />} />
          <Route path="/Dashboard1" element={<Dashboard1 />} /> {/* Define the dashboard page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
