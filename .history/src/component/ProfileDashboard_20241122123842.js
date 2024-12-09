import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionPlans = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [plansData, setPlansData] = useState([]);

  // Fetch subscription plans when component mounts
  useEffect(() => {
    const fetchPlansData = async () => {
      try {
        console.log('Making API request to fetch subscription plans...');
        
        // Make the API request with the Bearer token
        const response = await axios.get('http://103.35.121.219:4000/corp/subscription/fetchAllPlans', {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });

        // Check if the response is successful
        if (response.data.code === 1000) {
          setPlansData(response.data.plans);  // Save plans data to state
        } else {
          console.error('API Response Error:', response.data);
          setError('Failed to fetch subscription plans');
        }
      } catch (err) {
        console.error('API Fetch Error:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlansData();
  }, []); // Empty dependency array to run once on mount

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an issue
  if (error) {
    return (
      <div>
        {error}
        <br />
        <small>Check console for more details.</small>
      </div>
    );
  }

  // Render the subscription plans data
  return (
    <div className="container">
      <h2 className="text-center my-4">Subscription Plans</h2>
      
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Plan Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plansData.length > 0 ? (
            plansData.map((plan, index) => (
              <tr key={plan.id}>
                <td>{index + 1}</td>
                <td>{plan.plan_name}</td>
                <td>{plan.price}</td>
                <td>{plan.description}</td>
                <td>{plan.status === 1 ? 'Active' : 'Inactive'}</td>
                <td>
                  <button className="btn btn-info btn-sm">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No subscription plans available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionPlans;
