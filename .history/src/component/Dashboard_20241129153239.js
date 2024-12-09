import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [corpData, setCorpData] = useState(null);

  useEffect(() => {
    // Fetch the corporate data (including corp_id)
    axios
      .post('http://103.35.121.219:4000/corp/dashboard/fetchCorpData', {
        headers: {
          Authorization: `Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz`,
        },
      })
      .then((response) => {
        if (response.data.code === 1000) {
          setCorpData(response.data.corp); // Assuming the response has a corp field
        }
      })
      .catch((err) => {
        console.error('Error fetching corp data:', err);
      });
  }, []);

  if (!corpData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        {/* Add Link to ViewProfile with the corp_id */}
        <Link to={`/ViewProfile/${corpId}`}>
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
