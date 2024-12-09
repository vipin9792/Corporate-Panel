import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();  // to access URL query parameters

  // Extract corp_id and email from the URL
  const searchParams = new URLSearchParams(location.search);
  const corpId = searchParams.get("corpId");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!corpId) {
      setError("No corpId found. Redirecting to signup.");
      setLoading(false);
      navigate("/signup");  // Redirect to signup if no corpId is found
      return;
    }

    // Fetch the profile data from the server using the corpId
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `http://103.35.121.219:4000/corp/dashboard/fetchProfile/${corpId}`,
          {
            headers: {
              Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`, // Same token for profile fetch
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setError("Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [corpId, navigate]);

  if (loading) {
    return <div>Loading profile data...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2>Profile Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            value={profileData?.companyName || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailId">Email</label>
          <input
            type="email"
            id="emailId"
            className="form-control"
            value={email || profileData?.emailId || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="tel"
            id="phoneNo"
            className="form-control"
            value={profileData?.phoneNo || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={profileData?.address || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="userid">User ID</label>
          <input
            type="text"
            id="userid"
            className="form-control"
            value={profileData?.userid || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={profileData?.name || ""}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwd">Password</label>
          <input
            type="password"
            id="passwd"
            className="form-control"
            value={profileData?.passwd || ""}
            readOnly
          />
        </div>
      </form>
    </div>
  );
};

export default ViewProfile;
