import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState('');

  const setUserName = (name) => {
    setName(name);
  };
  
  const value = {
    name,
    setUserName,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}