
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
function App() {
  return (
    
    <Router>
        <Routes>
          body {
    background-color: #f8f9fa;
}

.confirmation-container {
    animation: fadeIn 1s ease-in-out;
    max-width: 600px;
    margin: auto;
    padding: 40px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.check-icon {
    font-size: 100px;
    color: #28a745;
    animation: bounce 1s infinite;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

        <Route path='/' element={<ResetPassword />} /> 
        <Route path='/' element={<Dashboard />} /> 
        <Route path='/' element={<Otp/>} /> 
       <Route path='/SignUp' element={<SignUp />} /> 
       <Route path='/LoginPage' element={<LoginPage />} />
       <Route path='/ForgetPassword' element={<ForgetPassword />} />
       <Route path='/otp' element={<Otp/>} /> 
      
       <Route path='/SignUp' element={<SignUp />} /> 
      <Route path='/' element={<Dashboard />} /> 
      <Route path='/EditProfile' element={<EditProfile/>} /> 
    
      <Route path='/ViewProfile' element={<ViewProfile/>} /> 
      
      <Route path='/' element={<Dashboard />} /> 
      <Route path='/' element={<Otp/>} /> 
      <Route path='/' element={<LoginPage />} />
      <Route path='/' element={<Dashboard />} /> 
      <Route path='/' element={<ForgetPassword />} />
      <Route path='/otp' element={<Otp/>} /> 
    
      <Route path='/' element={<Dashboard />} /> 
    
      <Route path='/' element={<Dashboard />} /> 

   <Route path='/ForgetPassword' element={<ForgetPassword />} />
      <Route path='/otp' element={<Otp/>} /> 
      <Route path='/' element={<Otp/>} /> 
    

      <Route path='/' element={<Otp/>} /> 
      <Route path='/' element={<Dashboard />} /> 
      <Route path='/' element={<LoginPage />} />
    
      
      <Route path='/' element={<LoginPage />} />
    
     
    
      <Route path='/ForgetPassword' element={<ForgetPassword />} />
     
      <Route path='/LoginPage' element={<LoginPage />} />
  
     
      <Route path='/ForgetPassword' element={<ForgetPassword />} />
     
      <Route path='/' element={<Dashboard />} />  
     
      <Route path='/' element={<Dashboard />} /> 
      
     



     
      
      </Routes>
   
    </Router>
    
  );
}

export default App;
