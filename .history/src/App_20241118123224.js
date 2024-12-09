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
// import Slider from "./component/Slider";
import OtpVerify from "./component/OtpVerify";




function App() {
  const [userProfile, setUserProfile] = useState(null);

  // Callback function passed to LoginPage to handle successful login
  const handleLoginSuccess = (profile) => {
    // Store the profile or take any action you need upon successful login
    setUserProfile(profile);
    console.log("Login successful, user profile:", profile);
  };


  return (

    <div>
    <h1>Welcome to the App</h1>

    {/* Pass the handleLoginSuccess function to LoginPage */}
    <LoginPage onLoginSuccess={handleLoginSuccess} />

    {/* Display user profile details if logged in */}
    {userProfile && (
      <div>
        <h3>Welcome, {userProfile.company_name}!</h3>
        <p>Email: {userProfile.email}</p>
        <p>Phone: {userProfile.phone_no}</p>
        <p>Company Address: {userProfile.address}</p>
      </div>
    )}







   

    <Router>
      <Routes> 
      <Route path="/" element={<SignUp />} />
        <Route path="/" element={<OtpVerify />} />
     
      <Route path="/" element={<Otp />} />
    
      <Route path="/" element={<Otp />} />
     
      <Route path="/verify-otp" element={<OtpVerify />} />
     
      {/* <Route path="/" element={<Slider />} /> */}
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
    </div>
  );
}

export default App;
