import React, { createContext, useContext, useState } from "react";

// Create context for corpId
const CorpIdContext = createContext();

export const useCorpId = () => {
  return useContext(CorpIdContext);
};

export const CorpIdProvider = ({ children }) => {
  const [corpId, setCorpId] = useState(null);

  return (
    <CorpIdContext.Provider value={{ corpId, setCorpId }}>
      {children}
    </CorpIdContext.Provider>
  );
};
