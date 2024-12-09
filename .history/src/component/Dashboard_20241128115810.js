import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";  // Import useParams for dynamic route params

const Dashboard = () => {
  const { corpId } = useParams();  // Dynamically fetch the corpId from the URL params
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';  // Replace with your token

  // Fetch profile data from the API
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://103.35.121.219:4000/corp/dashboard/fetchProfile`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
          params: {
            corp_id: corpId,  // Now the corpId is dynamically passed in the API request
          },
        }
      );
      
      if (response.status === 200 && response.data.code === 1000) {
        setProfile(response.data.profile);
      } else {
        setError("Failed to fetch profile data.");
      }
    } catch (err) {
      console.error("Error fetching profile data", err);
      setError("An error occurred while fetching profile data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if corpId is available
    if (corpId) {
      fetchProfileData();
    } else {
      setError("No corp_id found!");
    }
  }, [corpId]);

  // Handle the case where the profile is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle the case where there was an error
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Profile</h2>

      {/* Display Profile Information in Read-only Fields */}
      {profile && (
        <form>
          <div className="row mb-3">
            <label htmlFor="companyName" className="col-sm-2 col-form-label">
              Company Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="companyName"
                value={profile.company_name}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="phoneNo" className="col-sm-2 col-form-label">
              Phone Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="phoneNo"
                value={profile.phone_no}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="address" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="address"
                value={profile.address}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                value={profile.email}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="username"
                value={profile.username}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="logo" className="col-sm-2 col-form-label">
              Company Logo
            </label>
            <div className="col-sm-10">
              <img
                src={profile.logo}
                alt="Company Logo"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="storageUsed" className="col-sm-2 col-form-label">
              Storage Used
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="storageUsed"
                value={`${profile.storage_used} MB`}
                readOnly
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
