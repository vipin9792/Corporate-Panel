
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import SignUp from './component/SignUp';
 import Dashboard from './component/Dashboard';
 import ForgetPassword from './component/ForgetPassword';
import Otp from './component/Otp';
import EditProfile from './component/EditProfile';
import ViewProfile from './component/ViewProfile';
import ResetPassword from './component/ResetPassword';
import UpgradePlan from './component/UpgradePlan';
import Navbar from './component/Navbar';
import BuyNowPage from './component/BuyNowPage';
import ThankuPage from './component/ThankuPage';
import HandleApply from './component/HandleApply';

// import Checkout from './component/Checkout';
// import Regis from './component/Regis';
// import AxiosLogin from './component/AxiosLogin';


function App() {
  return (
    
         <Router>
           
        <Routes>
        {/* <Route path='/' element={<AxiosLogin />} /> 
        <Route path='/' element={<Regis />} />  */}
        {/* <Route path='/' element={<Checkout/>} /> */}
        <Route path='/' element={<ResetPassword />} />
        <Route path='/' element={<ThankuPage/>} /> 
        <Route path='/' element={<Otp/>} /> 
        <Route path='/' element={<HandleApply/>} /> 
        <Route path='/' element={<Dashboard />} /> 
       
        <Route path='/' element={<SignUp />} /> 
       
        
   
        <Route path='/' element={<ViewProfile/>} /> 
  
     
        <Route path='/' element={<Navbar/>} /> 
        <Route path='/' element={<SignUp />} /> 
        <Route path='/' element={<ResetPassword />} /> 
        <Route path='/SignUp' element={<SignUp />} /> 
    
       <Route path='/ForgetPassword' element={<ForgetPassword />} />
      <Route path='/EditProfile' element={<EditProfile/>} /> 
      <Route path='/ViewProfile' element={<ViewProfile/>} /> 
      
      </Routes>
   
    </Router>
    
  );
}

export default App;
