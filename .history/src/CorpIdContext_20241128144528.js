import React, { createContext, useState, useContext } from "react";

// Create context for corpId
const CorpIdContext = createContext();

export const CorpIdProvider = ({ children }) => {
  const [corpId, setCorpId] = useState(null);  // Use state to store corp_id

  return (
    <CorpIdContext.Provider value={{ corpId, setCorpId }}>
      {children}
    </CorpIdContext.Provider>
  );
};

// Custom hook to use the context
export const useCorpId = () => {
  return useContext(CorpIdContext);
};
