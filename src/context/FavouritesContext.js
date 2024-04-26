import React, { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Function to add an item to the favourites array
  const addFavourite = (item) => {
    setFavourites(prevFavourites => [...prevFavourites, item]);
  };

  // Function to remove an item from the favourites array
  const removeFavourite = (itemId) => {
    setFavourites(prevFavourites => prevFavourites.filter(item => item.id !== itemId));
  };

  // Function to toggle an item as a favourite
  const toggleFavourite = (item) => {
    setFavourites((prevFavourites) => {
        const isFavourite = prevFavourites.some((favItem) => favItem.id === item.id);

        if (isFavourite) {
            return prevFavourites.filter((favItem) => favItem.id !== item.id);
        } else {
            return [...prevFavourites, item];
        }
    }); 
  };
  
  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
