
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import SignUp from './component/SignUp';
 import Dashboard from './component/Dashboard';
 import Header from './component/Header';
 
 import Upcoming from './component/Upcoming';
 import Completed from './component/Completed';
 import Pending from './component/Pending';
 import Rejected from './component/Rejected';
 import ForgetPassword from './component/ForgetPassword';
import Otp from './component/Otp';
import EditProfile from './component/EditProfile';
import ViewProfile from './component/ViewProfile';
import ResetPassword from './component/ResetPassword';
import ConfirmationPage from './component/ConfirmationPage';
// import Footer from './component/Footer';
function App() {
  return (
    
    <Router>
       
        <Routes>
        {/* <Route path='/' element={<Footer />} />  
        <Route path='/' element={<Dashboard />} /> 
        <Route path='/' element={<SignUp />} /> 
        <Route path='/' element={<ViewProfile/>} /> 
        <Route path='/' element={<ResetPassword />} /> 
        <Route path='/' element={<Dashboard />} /> 
        <Route path='/SignUp' element={<SignUp />} /> 
        <Route path='/' element={<ResetPassword />} /> 
        <Route path='/' element={<Dashboard />} /> 
        <Route path='/' element={<ConfirmationPage />} /> 
        <Route path='/' element={<ResetPassword />} /> 
      
        <Route path='/' element={<Otp/>} /> 
      
       <Route path='/LoginPage' element={<LoginPage />} />
       <Route path='/ForgetPassword' element={<ForgetPassword />} />
      <Route path='/EditProfile' element={<EditProfile/>} /> 
      <Route path='/ViewProfile' element={<ViewProfile/>} /> 
      
      </Routes>
   
    </Router>
    
  );
}

export default App;