import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { CorpIdProvider } from "./CorpIdContext";  // Import the provider
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
  //  import ProfileDashboard from './component/ProfileDashboard';
  //  import EditProfile1 from './component/EditProfile1';
   import ViewProfile from './component/ViewProfile';




const App = () => {
  return (

    <CorpIdProvider>
    <Router>
        
     
        <Routes>
       
        
       
          <Route path="/" element={<SignupForm />} />
        <Route path="/" element={<Checkout />} />
        <Route path="/" element={<HandleApply />} />
        <Route path="/" element={<BuyNowPage />} />
       




          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/verify-otp" element={<EmailVerificationFlow />} />
          <Route path="/ForgetPassword1" element={<ForgetPassword1 />} /> 
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/ResetPassword1/:token/:corpId" element={<ResetPassword1 />} />
          <Route path="/ThankuPage" element={<ThankuPage />} />




          

          <Route path="/dashboard" element={<Dashboard />} />

           {/* <Route path="/Dashboard" element={<Dashboard />} />   */}
          
          <Route path="/EditProfile" element={<EditProfile />} /> 
          <Route path="/UpgradePlan" element={<UpgradePlan />} />  
           {/* <Route path="/EditProfile1" element={<EditProfile1 />} /> */}
          {/* <Route path="/ViewProfile" element={<ViewProfile />} />      */}
          <Route path="/ViewProfile/:corp_id" component={ViewProfile} />


        </Routes>
       
    </Router>
    </CorpIdProvider>

  );
};

export default App;
