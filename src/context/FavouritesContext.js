import React, { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Step 2: addFavourite function
  const addFavourite = (item) => {
    setFavourites(prevFavourites => [...prevFavourites, item]);
  };

  // Step 3: removeFavourite function
  const removeFavourite = (itemId) => {
    setFavourites(prevFavourites => prevFavourites.filter(item => item.id !== itemId));
  };

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
