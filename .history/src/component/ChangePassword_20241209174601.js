import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams

const ChangePassword = () => {
  const { corp_id } = useParams();  // Access the dynamic 'corp_id' from the URL

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`/api/corp/dashboard/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${'!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz


'}`, // Pass your Bearer token here
        },
        body: JSON.stringify({
          corp_id,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();
      if (data.code === 1000) {
        setSuccessMessage(data.status);
      } else {
        setError("Error changing password");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div>
      <h4>Change Password for corp_id: {corp_id}</h4>
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
