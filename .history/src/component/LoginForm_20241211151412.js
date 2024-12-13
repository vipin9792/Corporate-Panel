import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import loginApi from "../Api Folder/loginApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const { login } = useAuth(); // Use login from AuthProvider
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const responseData = await loginApi(values);
      if (responseData.code === 1000) {
        toast.success("Login Successful");
        login(); // Update authentication state
        const corpId = responseData.profile.id;
        navigate(`/Dashboard/${corpId}`);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("An error occurred during login");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
