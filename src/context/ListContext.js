// ListContext.js
import { createContext, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [lists, setLists] = useState([]);

    const updateList = (id, items) => {
      setLists((prevLists) => prevLists.map((list) => list.id === id ? { ...list, items } : list));
    };
  
    return (
      <ListContext.Provider value={{ lists, setLists, updateList }}>
        {children}
      </ListContext.Provider>
    );
  };