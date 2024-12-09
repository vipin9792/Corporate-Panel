import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = ({ corp_id }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const BEARER_TOKEN = "!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous success/error messages
    setSuccess(false);
    setError("");

    // Validation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters!");
      return;
    }

    setLoading(true); // Set loading state to true when API is being called

    // API Call
    const payload = {
      corp_id: corp_id,  // Use the dynamic corp_id
      old_password: oldPassword,
      new_password: newPassword,
    };

    // Make the POST request to the API with Bearer token in the Authorization header
    fetch("http://103.35.121.219:4000/corp/dashboard/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`, // Adding the Bearer token here
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Set loading to false when the response is received
        if (data.code === 1000) {
          setSuccess(true);
        } else {
          setError(data.status);
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading if an error occurs
        console.error("Error:", error);
        setError("An error occurred while changing the password.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h4>Change Password</h4>
            </div>
            <div className="card-body">
              {success && <Alert variant="success">Password changed successfully!</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="oldPassword" className="mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? "Changing Password..." : "Change Password"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
