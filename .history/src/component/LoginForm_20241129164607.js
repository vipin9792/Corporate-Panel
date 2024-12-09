import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send the login request to the server
      const response = await axios.post(
        'http://103.35.121.219:4000/corp/login', 
        values, 
        {
          headers: {
            Authorization: `Bearer YOUR_BEARER_TOKEN`
          }
        }
      );
      
      if (response.data.code === 1000) {
        // Successful login
        setError("");  // Clear any previous error messages
        alert('Login Successful!');
        
        // Store the corp_id (or any other identifier) in localStorage
        const corpId = response.data.profile.id;
        localStorage.setItem('corp_id', corpId);
        
        // Navigate to the Dashboard with the corp_id
        navigate(`/Dashboard/${corpId}`);
      } else {
        // Invalid login, show error message
        setError("Invalid credentials. Please try again.");
        alert('Login Failed! Invalid credentials.');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred during login.");
    }
    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field 
                type="text" 
                id="username" 
                name="username" 
                className="form-control" 
                placeholder="Enter your username" 
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field 
                type="password" 
                id="password" 
                name="password" 
                className="form-control" 
                placeholder="Enter your password" 
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
