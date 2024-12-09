import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const UserContext = createContext();

// Custom hook to use the user context
export const useUserContext = () => useContext(UserContext);

// UserContext provider component to wrap your application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    corp_id: null, // Will be dynamically fetched
    name: "",
    email: "",
  });

  useEffect(() => {
    // Example logic to fetch dynamic corp_id (you can get this from API or session)
    const fetchUserData = async () => {
      // Example: This could be an API call or session data retrieval
      const response = await fetch('/api/getUserInfo'); // Replace with your API
      const data = await response.json();
      setUser({
        corp_id: data.corp_id, // Dynamic corp_id
        name: data.name,
        email: data.email,
      });
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
