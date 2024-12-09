import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import Dashboard1 from "./component/Dashboard1";
import ForgetPassword from "./component/ForgetPassword";
import Otp from "./component/Otp";
import EditProfile from "./component/EditProfile";
import ViewProfile from "./component/ViewProfile";
import ResetPassword from "./component/ResetPassword";
import Navbar from "./component/Navbar";
import BuyNowPage from "./component/BuyNowPage";
import ThankuPage from "./component/ThankuPage";
import HandleApply from "./component/HandleApply";
import Api from "./component/Api";
import SignUp from "./component/SignUp";
import OtpVerify from "./component/OtpVerify";

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();  // Use useNavigate hook for navigation

  // Check localStorage for the token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);  // If the token exists in localStorage, set it
    }
  }, []);  // This empty dependency array ensures it runs only once when the component is mounted

  // Handle successful login by saving the token
  const handleLoginSuccess = (receivedToken) => {
    setToken(receivedToken);  // Store the token in state
    localStorage.setItem("authToken", receivedToken);  // Store the token in localStorage for persistence
  };
  return (
    <Router>
      <Routes>

      <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

{/* Protected Routes */}
<Route
  path="/dashboard"
  element={token ? <Dashboard /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
/>


      {/* <Route path="/" element={<Dashboard1 />} /> */}
        {/* Public Routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/thank-you" element={<ThankuPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/api" element={<Api />} />
        <Route path="/handle-apply" element={<HandleApply />} />
        
        {/* Protected Routes with Navbar */}
         
        <Route element={<Navbar />}>
        
          <Route path="/edit-profile" element={token ? <EditProfile /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/view-profile" element={token ? <ViewProfile /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/forget-password" element={token ? <ForgetPassword /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          {/* <Route path="/upgrade-plan" element={token ? <UpgradePlan /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} /> */}
          <Route path="/buy-now" element={token ? <BuyNowPage /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
