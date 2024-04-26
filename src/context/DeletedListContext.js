import React, { createContext, useState } from 'react';

export const DeletedListContext = createContext();

export const DeletedListProvider = ({ children }) => {
  const [deletedLists, setDeletedLists] = useState([]);

  // Function to restore a list from the deletedLists array
  function restoreList(id) {
    const listToRestore = deletedLists.find(list => list.id === id);
    
    if (listToRestore) {
        setDeletedLists(deletedLists.filter(list => list.id !== id));
        return listToRestore;
    }
}

  return (
    <DeletedListContext.Provider value={{ deletedLists, setDeletedLists, restoreList }}>
      {children}
    </DeletedListContext.Provider>
  );
};