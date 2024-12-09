import React, { useState } from "react";
import axios from "axios";

const SignupForm = ({ setMessage, setError }) => {
  const [signupData, setSignupData] = useState({
    companyName: "",
    emailId: "",
    phoneNo: "",
    address: "",
    userid: "",
    passwd: "",
    name: "",
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending signup request with data:", signupData);  // Log request payload
    
    try {
      const response = await axios.post(
        "http://103.35.121.219:4000/corp/register",
        signupData,
        {
          headers: {
            Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
          },
        }
      );

      console.log("Signup response received:", response.data);  // Log API response

      if (response.data.code === 1000) {
        setMessage("Signup successful! Please log in.");
      } else {
        setError("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup request error:", error);  // Log error details
      setError("Signup failed! Please try again.");
    }
  };

  return (
    <form onSubmit={handleSignupSubmit}>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={signupData.companyName}
        onChange={handleSignupChange}
        required
      />
      <input
        type="email"
        name="emailId"
        placeholder="Email ID"
        value={signupData.emailId}
        onChange={handleSignupChange}
        required
      />
      <input
        type="text"
        name="phoneNo"
        placeholder="Phone Number"
        value={signupData.phoneNo}
        onChange={handleSignupChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={signupData.address}
        onChange={handleSignupChange}
        required
      />
      <input
        type="text"
        name="userid"
        placeholder="User ID"
        value={signupData.userid}
        onChange={handleSignupChange}
        required
      />
      <input
        type="password"
        name="passwd"
        placeholder="Password"
        value={signupData.passwd}
        onChange={handleSignupChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={signupData.name}
        onChange={handleSignupChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
