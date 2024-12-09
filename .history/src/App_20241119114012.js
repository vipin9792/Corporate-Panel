import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './components/Login';
import EmailVerificationFlow from './components/EmailVerificationFlow';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Email Verification and Authentication App</h1>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerificationFlow />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
