import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "./Slider";




const ChangePassword = () => {
  const { corp_id } = useParams(); // Get `corp_id` from URL params
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      // Send the API request to change the password
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/dashboard/changePassword',
        {
          corp_id,
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz', // Replace with your actual Bearer token
          },
        }
      );

      // Check if the response is successful
      if (response.data.code === 1000) {
        setMessage('Password changed successfully!');
      } else {
        setError('Failed to change password');
      }
    } catch (err) {
      console.error('Error changing password:', err);
      setError('An error occurred while changing the password');
    }
  };

  // Toggle visibility of old password
  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  // Toggle visibility of new password
  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  // Toggle visibility of confirm password
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
 
  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 text-white bg-icons bg-primary">
              <div className="imageicon">
                <img
                  src="../logo1.png"
                  alt="../logo"
                  id="logo"
                  style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
                />
                <img src="../pen-scale.svg" alt="bg-icon-1" />
                <img src="../boy.svg" alt="boy" />
                <img src="../bulb1.svg" alt="bulb1" />
                <img src="../computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  {/* <h4
                    className="text-secondary"
                    style={{ marginLeft: "222px" }}
                  >
                    Corporate <br />  <span className="text">Login</span>
                  
                  </h4> */}














                  
              
                </div>
             
             
              </div>
            </div>

            <Slider />
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ChangePassword;
