import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/LoginPage";

import Dashboard from "./component/Dashboard";
import ForgetPassword from "./component/ForgetPassword";
import Otp from "./component/Otp";
import EditProfile from "./component/EditProfile";
import ViewProfile from "./component/ViewProfile";
import ResetPassword from "./component/ResetPassword";
import UpgradePlan from "./component/UpgradePlan";
import Navbar from "./component/Navbar";
import BuyNowPage from "./component/BuyNowPage";
import ThankuPage from "./component/ThankuPage";
import HandleApply from "./component/HandleApply";
import Api from "./component/Api";
import SignUp from "./component/SignUp";
import OtpVerify from "./component/OtpVerify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // const bearerToken = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  
  // Handle successful login (store token or set user state)
  const handleLoginSuccess = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };




  return (


    <div>
    {isLoggedIn ? (
      <div>
        <h2>Welcome to your dashboard!</h2>
        <p>Your token: {token}</p>
      </div>
    ) : (
      <>
        
        <Signin onLoginSuccess={handleLoginSuccess} />
      </>
    )}







    <Router>
      <Routes>
      <LoginPage onLoginSuccess={handleLoginSuccess} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<OtpVerify />} />
        <Route path="/" element={<Otp />} />
        <Route path="/" element={<Otp />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route path="/" element={<ThankuPage />} />
        <Route path="/" element={<ResetPassword />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<Api />} />
        <Route path="/" element={<HandleApply />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/" element={<Navbar />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/" element={<ViewProfile />} />
        <Route path="/" element={<ResetPassword />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ViewProfile" element={<ViewProfile />} />
      </Routes>
    </Router>
  
  </>
  );
}

export default App;
