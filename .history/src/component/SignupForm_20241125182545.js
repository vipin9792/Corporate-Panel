import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const [corp_id, setCorpId] = useState(""); // This is your state for corp_id
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('your_api_endpoint', {
        // Form data here
      });

      if (response.data && response.data.corp_id) {
        setCorpId(response.data.corp_id); // Store the corp_id in state
        history.push({
          pathname: '/view-profile',
          state: { corp_id: response.data.corp_id } // Passing corp_id in state
        });
      } else {
        // Handle API error
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" name="username" />
      <label>Password:</label>
      <input type="password" name="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
