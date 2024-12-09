import React, { createContext, useContext, useState } from "react";

// Create the context
const CorpIdContext = createContext();

// Create a provider component
export const CorpIdProvider = ({ children }) => {
  const [corpId, setCorpId] = useState(null);

  return (
    <CorpIdContext.Provider value={{ corpId, setCorpId }}>
      {children}
    </CorpIdContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCorpId = () => {
  return useContext(CorpIdContext);
};
