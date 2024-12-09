import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { corp_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      console.log("Fetching data for corp_id:", corp_id);

      const response = await axios.post(
        `http://103.35.121.219:4000/corp/dashboard/fetchDetail`,
        {
          corp_id: corp_id
        },
        {
          headers: {
            "Authorization": "Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz"
          }
        }
      );

      // Debug: Log the response data
      console.log("Response Data:", response.data);

      if (response.data.code === 1000) {
        setData(response.data.detail);
      } else if (response.data.code === 1003) {
        setError("APP Token Mismatch or Broken. Please check the token.");
      } else {
        setError("Unexpected response code: " + response.data.code);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [corp_id]);

  return (
    <div className="dashboard-container">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {data && (
        <div className="alert" role="alert">
          <h4>Active Plan Free</h4>
          <p>Your current plan is the Free Plan. Upgrade to a premium plan for more features!</p>
          <button className="btn btn-primary">Upgrade Plan</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
