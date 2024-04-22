// ListContext.js
import React, { createContext, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [lists, setLists] = useState([]);

    const updateList = (id, items) => {
      setLists((prevLists) => prevLists.map((list) => list.id === id ? { ...list, items } : list));
    };

    // Re-Add a list to the lists?
    function addList(list) {
      // Remove the starred property from the items of the list
      const listToRestore = { ...list, items: list.items.map(item => ({ ...item, starred: false })) };
      
      setLists(prevLists => [...prevLists, list]);
    }
  
    return (
      <ListContext.Provider value={{ lists, setLists, updateList, addList }}>
        {children}
      </ListContext.Provider>
    );
  };