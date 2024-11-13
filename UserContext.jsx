import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {  // Make sure to export UserProvider
  const [user, setUser] = useState({
    username: 'JohnDoe',
    isAuthenticated: true,
  });

  // Function to handle user login
  const login = (username) => {
    setUser({ username, isAuthenticated: true });
  };

  // Function to handle logout
  const logout = () => {
    setUser({ username: '', isAuthenticated: false });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
