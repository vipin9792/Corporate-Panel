import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // To access the URL query params
import "../App.css";
import Slider from "./Slider";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const corpId = new URLSearchParams(location.search).get("corpId"); // Get the corp_id from the URL query params

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  useEffect(() => {
    if (corpId) {
      fetchProfileData(corpId); // Fetch profile data if corpId is available
    }
  }, [corpId]);

  const fetchProfileData = async (corpId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://103.35.121.219:4000/corp/dashboard/fetchProfile/${corpId}`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (response.status === 200) {
        setProfileData(response.data);  // Set profile data from API response
      } else {
        setError('Failed to load profile data');
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Error fetching profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section>
        <div className="row credential">
          <div className="col-lg-6 bg-primary text-white bg-icons">
            <div className="imageicon">
              <img src="logo1.png" alt="logo" id="logo" />
              <img src="pen-scale.svg" alt="" />
              <img src="boy.svg" alt="boy" />
              <img src="bulb1.svg" alt="bg-icon-3" />
              <img src="computer-person.svg" alt="bg-icon-8" />
            </div>
            <div className="warapper-form my-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="text-secondary text-end">View Profile</h4>
              </div>

              {loading ? (
                <div>Loading profile...</div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <div className="profile-info">
                  <h5>Company Name: {profileData?.companyName}</h5>
                  <p>Email: {profileData?.emailId}</p>
                  <p>Phone: {profileData?.phoneNo}</p>
                  <p>Address: {profileData?.address}</p>
                  <p>User ID: {profileData?.userid}</p>
                  <p>Full Name: {profileData?.name}</p>
                </div>
              )}
            </div>
          </div>

          <Slider />
        </div>
      </section>
    </div>
  );
};

export default ViewProfilePage;
