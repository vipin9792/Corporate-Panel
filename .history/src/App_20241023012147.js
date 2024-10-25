
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
function App() {
  return (
    
    <Router>
      
      <Routes>
    
      <Route path='/' element={<E/>} /> 
      
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
