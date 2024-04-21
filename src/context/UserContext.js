import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState('');

  const setUserName = (name) => {
    setName(name);
  };
  
  const value = {
    name,
    setUserName, // Add the setUserName function to the context value
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}