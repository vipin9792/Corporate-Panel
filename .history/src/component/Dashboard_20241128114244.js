import React, { useEffect } from 'react';
import { useCorpId } from './CorpIdContext';

const Dashboard = () => {
  const { corpId } = useCorpId();  // Access the global corp_id

  useEffect(() => {
    if (!corpId) {
      console.log('No corp_id found!');
      // Redirect or handle this case
    } else {
      console.log('Retrieved corp_id:', corpId);
      // Proceed with the corp_id in your requests
    }
  }, [corpId]);

  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <p>Your corp_id is: {corpId}</p>
    </div>
  );
};

export default Dashboard;
