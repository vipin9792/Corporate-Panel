import React, { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Create a context for user data
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { corp_id } = useParams();  // Get the corp_id from the URL dynamically
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://103.35.121.219:4000/corp/dashboard/fetchProfile/${corp_id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        
        const data = await response.json();
        
        setUser({
          corp_id: corp_id,
          name: data.name,
          email: data.email,
          role: data.role,
        });
      } catch (error) {
        setError(error.message || "An error occurred while fetching the user data.");
      } finally {
        setLoading(false);
      }
    };

    if (corp_id) {
      fetchUserData();
    }
  }, [corp_id]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
