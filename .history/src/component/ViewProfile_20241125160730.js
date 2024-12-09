import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  const corpId = new URLSearchParams(location.search).get('corpId');  // Get corpId from query params
  
  useEffect(() => {
    if (corpId) {
      fetchProfile(corpId);
    } else {
      setError('corpId is missing!');
      setLoading(false);
    }
  }, [corpId]);

  const fetchProfile = async (corpId) => {
    try {
      const response = await axios.get(
        `http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.code === 1000) {
        setProfile(response.data.profile);
      } else {
        setError('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('An error occurred while fetching the profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      {profile && (
        <div>
          <h1>Company Profile</h1>
          <div>
            <img src={profile.logo} alt={profile.company_name} width="100" />
            <h2>{profile.company_name}</h2>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone_no}</p>
            <p>Address: {profile.address}</p>
            <p>Storage Used: {profile.storage_used} MB</p>
            <p>Username: {profile.username}</p>
            <p>Full Name: {profile.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const BEARER_TOKEN = '!WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz';

  const corpId = new URLSearchParams(location.search).get('corpId');  // Get corpId from query params
  
  useEffect(() => {
    if (corpId) {
      fetchProfile(corpId);
    } else {
      setError('corpId is missing!');
      setLoading(false);
    }
  }, [corpId]);

  const fetchProfile = async (corpId) => {
    try {
      const response = await axios.get(
        `http://103.35.121.219:4000/corp/dashboard/fetchProfile?corp_id=${corpId}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );

      if (response.status === 200 && response.data.code === 1000) {
        setProfile(response.data.profile);
      } else {
        setError('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('An error occurred while fetching the profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      {profile && (
        <div>
          <h1>Company Profile</h1>
          <div>
            <img src={profile.logo} alt={profile.company_name} width="100" />
            <h2>{profile.company_name}</h2>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone_no}</p>
            <p>Address: {profile.address}</p>
            <p>Storage Used: {profile.storage_used} MB</p>
            <p>Username: {profile.username}</p>
            <p>Full Name: {profile.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile
