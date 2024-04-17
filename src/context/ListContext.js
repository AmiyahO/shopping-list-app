// ListContext.js
import { createContext, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [lists, setLists] = useState([]);

    const updateList = (id, items) => {
      setLists((prevLists) => prevLists.map((list) => list.id === id ? { ...list, items } : list));
    };

    // Re-Add a list to the lists?
    function addList(list) {
      setLists(prevLists => [...prevLists, list]);
    }
  
    return (
      <ListContext.Provider value={{ lists, setLists, updateList, addList }}>
        {children}
      </ListContext.Provider>
    );
  };