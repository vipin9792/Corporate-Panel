import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import SignupForm from './component/SignupForm';
import LoginForm from './component/LoginForm';
import EmailVerificationFlow from './component/EmailVerificationFlow';
import ForgetPassword1 from './component/ForgetPassword1';
import ResetPassword1 from './component/ResetPassword1';
import Dashboard from './component/Dashboard'; 
import EditProfile from './component/EditProfile';
import UpgradePlan from './component/UpgradePlan';
import BuyNowPage from './component/BuyNowPage';
import Checkout from './component/Checkout';
import HandleApply from './component/HandleApply';
import ThankuPage from './component/ThankuPage';
import ViewProfile from './component/ViewProfile';

const App = () => {
  const [userId, setUserId] = useState(232);  // Hardcoded userId (for testing)
  const [token, setToken] = useState('!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz'); // Hardcoded token (for testing)

  return (
    <Router>
      <Routes>
        {/* Define routes with unique paths */}
        <Route path="/" element={<SignupForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/handle-apply" element={<HandleApply />} />
        <Route path="/buy-now" element={<BuyNowPage />} />

        {/* Dashboard route with userId passed */}
        <Route path="/login" element={<LoginForm setUserId={setUserId} setToken={setToken} />} />

        {/* Pass hardcoded userId and token to Dashboard */}
        <Route 
          path="/dashboard" 
          element={<Dashboard userId={userId} token={token} />} 
        />
        {/* Other routes */}
        <Route path="/verify-otp" element={<EmailVerificationFlow />} />
        <Route path="/forget-password" element={<ForgetPassword1 />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/reset-password/:token/:corpId" element={<ResetPassword1 />} />
        <Route path="/thank-you" element={<ThankuPage />} />

        {/* Profile and Edit Profile routes */}
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/upgrade-plan" element={<UpgradePlan />} />
        <Route path="/view-profile" element={<ViewProfile />} />      
        <Route path="/view-profile/:corp_id" element={<ViewProfile />} /> {/* Dynamic profile view */}

      </Routes>
    </Router>
  );
};

export default App;
