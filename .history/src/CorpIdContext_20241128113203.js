import React, { createContext, useState, useContext } from 'react';

// Create the Context
const CorpIdContext = createContext();

// Custom hook to access the context
export const useCorpId = () => useContext(CorpIdContext);

// Provider component to wrap around your app
export const CorpIdProvider = ({ children }) => {
  const [corpId, setCorpId] = useState(null);

  return (
    <CorpIdContext.Provider value={{ corpId, setCorpId }}>
      {children}
    </CorpIdContext.Provider>
  );
};
