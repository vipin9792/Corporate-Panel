import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context for user data
const UserContext = createContext();

// UserProvider component to wrap around the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mock fetching user data (you can replace this with actual API call)
    const fetchUserData = () => {
      const userData = {
        corp_id: '12345',  // example corp_id
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      setUser(userData); // Set the user data into context
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context data
export const useUserContext = () => {
  return useContext(UserContext);
};
